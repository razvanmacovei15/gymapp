import axios from "axios";
import { useRef, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the hidden file input
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  async function uploadFile() {
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload the file to the server
      const result = await axios.post(
        "http://.go.ro:8010/api/users/uploadFile",
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

  return { uploadFile };
};
