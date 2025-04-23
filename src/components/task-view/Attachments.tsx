import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import MiniAttachmentCard from "./MiniAttachmentCard";
import axios from "axios";
import { get } from "react-hook-form";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type AttachmentsProps = {
  taskId: number;
};

export const Attachments = ({ taskId }: AttachmentsProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [files, setFiles] = useState<string[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

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
      await uploadFile(selectedFile, taskId);
    }
  };

  const downloadFile = async (file: string) => {
    try {
      const response = await axios.get(`${apiUrl}/tasks/downloadFile`, {
        params: { taskId, fileName: file },
        responseType: "blob", // Handle binary file download
      });

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file); // Set the file name for download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getFiles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tasks/getFiles`, {
        params: { taskId },
      });
      console.log("Files:", response.data);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const deleteFile = async (file: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/tasks/deleteFile`, {
        params: { taskId, fileName: file },
      });
      console.log("File deleted:", response.data);
      getFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, [taskId]);

  async function uploadFile(selectedFile: File, taskId: number) {
    if (!selectedFile) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log("Uploading file with taskId:", taskId);

    try {
      const response = await axios.post(
        `${apiUrl}/tasks/uploadFile`,
        formData,
        {
          params: { taskId },
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

      console.log("File uploaded successfully:", response.data);
      getFiles();
    } catch (error) {
      setUploadStatus("error");
      setUploadProgress(0);

      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="w-1/5 text-gray-500">Attachments</p>
      <div className="flex flex-row gap-6 items-center justify-center">
        {files.length > 0 ? (
          files.map((file, index) => (
            <MiniAttachmentCard
              key={index}
              file={file}
              onDownload={() => downloadFile(file)}
              onDelete={() => deleteFile(file)}
            />
          ))
        ) : (
          <p>No files attached to task</p>
        )}
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
