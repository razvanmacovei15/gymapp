import { useRef, useState } from "react";
import { Button } from "../ui/button";
import MiniAttachmentCard from "./MiniAttachmentCard";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const Attachments = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [bucketName, setBucketName] = useState<string>(""); // New state for bucket name
  const [objectName, setObjectName] = useState<string>(""); // New state for object name

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", Array.from(files));
      // Add further logic to process the files here
      uploadFile();
    }
  };

  async function uploadFile() {
    if (!file || !bucketName || !objectName) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucketName", bucketName);
    formData.append("objectName", objectName);

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
          className="cursor-pointer rounded-full bg-slate-200 w-8 h-8 flex items-center justify-center text-2xl"
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
      
    </div>
  );
};
