import { useRef, useState } from "react";
import { Button } from "../ui/button";
import MiniAttachmentCard from "./MiniAttachmentCard";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const Attachments = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [bucketName, setBucketName] = useState<string>("test-files"); // New state for bucket name
  const [objectName, setObjectName] = useState<string>("test-file"); // New state for object name

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile); // Set the file state
      console.log("Selected file:", selectedFile);

      // Start the upload after setting the file
      await uploadFile(selectedFile);
    }
  };

  async function uploadFile(selectedFile: File) {
    if (!selectedFile || !bucketName || !objectName) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("bucketName", bucketName);
    formData.append("objectName", objectName);

    console.log("Uploading file:", selectedFile);
    console.log("Bucket name:", bucketName);
    console.log("Object name:", objectName);

    try {
      await axios.post("http://maco-coding.go.ro:8010/minio/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setUploadStatus("success");
      setUploadProgress(100);
    } catch {
      setUploadStatus("error");
      setUploadProgress(0);
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="w-1/5 text-gray-500">Attachments</p>
      <div className="flex flex-row gap-6 items-center justify-center">
        <MiniAttachmentCard />
        <MiniAttachmentCard />
        <MiniAttachmentCard />
        <Button
          variant="outline"
          onClick={handleAddFileClick}
          className="cursor-pointer rounded-full pb-3 bg-slate-200 w-8 h-8 flex text-2xl"
        >
          +
        </Button>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple // Allows selecting multiple files (optional)
        />
      </div>
      {uploadStatus === "uploading" && (
        <div className="space-y-4 w-full px-5">
          <div className="h-2.5 bg-gray-200 rounded-full w-full">
            <div
              className="h-2.5 rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% upload</p>
        </div>
      )}
      {file && uploadStatus !== "uploading" && (
        <>
          {uploadStatus === "success" && (
            <p className="text-green-500 px-5">File uploaded successfully!</p>
          )}
          {uploadStatus === "error" && (
            <p className="text-red-500">Error uploading file!</p>
          )}
        </>
      )}
    </div>
  );
};
