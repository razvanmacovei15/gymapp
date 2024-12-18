import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePopup } from "./PopupContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { z } from "zod";
import { ProfileForm } from "../forms/ProfileForm";
import { useAuth } from "../AuthProvider";
import { Button } from "../ui/button";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const ProfileMenuPopup = () => {
  const { authState, fetchProfilePhoto, profilePhoto } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the hidden file input
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]);
    }
  }

  function handleAvatarClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  }

  async function uploadFile() {
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload the file to the server
      const result = await axios.post(
        "http://maco-coding.go.ro:8010/api/users/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus("success");
      setUploadProgress(100);
      console.log("File upload successful:", result.data);

      // Fetch the updated profile photo
      await fetchProfilePhoto();
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadStatus("error");
      setUploadProgress(0);
    }
  }

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  const { isProfileMenuOpen, toggleProfileMenu } = usePopup();

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  if (!isProfileMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]"
      onClick={toggleProfileMenu} // Close popup when clicking on the backdrop
    >
      <div
        className="space-y-10 bg-white border border-gray-300 rounded-md p-10 z-[1000] w-2/6"
        onClick={(e) => e.stopPropagation()} // Prevent click inside the popup from closing it
      >
        <div className="flex flex-col justify-center items-center">
          {/* Avatar with file selection */}
          <Button
            className="relative h-8 w-8 rounded-full pb-10"
            onClick={handleAvatarClick} // Trigger file selection on avatar click
          >
            <Avatar className="h-20 w-20">
              {file ? (
                <AvatarImage
                  src={URL.createObjectURL(file)}
                  alt="Selected Avatar"
                />
              ) : (
                <AvatarImage src={profilePhoto} />
              )}
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
          {file && uploadStatus !== "uploading" && (
            <>
              <h1 className="text-sm pt-5 cursor-pointer" onClick={uploadFile}>
                Change profile picture
              </h1>

              {uploadStatus === "success" && (
                <p className="text-green-500">File uploaded successfully!</p>
              )}
              {uploadStatus === "error" && (
                <p className="text-red-500">Error uploading file!</p>
              )}
            </>
          )}
          {uploadStatus === "uploading" && (
            <div className="space-y-4">
              <div className="h-2.5 bg-gray-200 rounded-full w-full">
                <div
                  className="h-2.5 rounded-full bg-green-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{uploadProgress}% upload</p>
            </div>
          )}
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*" // Optional: accept only images
            onChange={handleFileChange} // Handle file selection
          />
        </div>
        {authState.currentUser && <ProfileForm user={authState.currentUser} toggleProfileMenu={toggleProfileMenu} />}
      </div>
    </div>
  );
};

export default ProfileMenuPopup;
