import React, { ChangeEvent, useState } from "react";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface FileUploaderProps {
  onFileUploaded?: (file: File) => void; // Callback when file is uploaded
}

const SimplerFileUploader: React.FC<FileUploaderProps> = ({
  onFileUploaded,
}) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://maco-coding.go.ro:8010/minio/uploadFile",
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

      if (onFileUploaded) {
        onFileUploaded(file); // Notify parent about the uploaded file
      }
    } catch {
      setUploadStatus("error");
      setUploadProgress(0);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileUploader"
        onChange={handleFileChange}
      />
      <label htmlFor="fileUploader" className="cursor-pointer">
        {uploadStatus === "uploading" && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        {uploadStatus === "success" && (
          <p className="text-green-500">Uploaded!</p>
        )}
        {uploadStatus === "error" && (
          <p className="text-red-500">Upload failed!</p>
        )}
      </label>
    </div>
  );
};

export default SimplerFileUploader;
