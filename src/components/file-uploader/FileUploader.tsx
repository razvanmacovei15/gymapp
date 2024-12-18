import axios from "axios";
import { ChangeEvent, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [bucketName, setBucketName] = useState<string>(""); // New state for bucket name
  const [objectName, setObjectName] = useState<string>(""); // New state for object name

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleBucketNameChange(event: ChangeEvent<HTMLInputElement>) {
    setBucketName(event.target.value);
  }

  function handleObjectNameChange(event: ChangeEvent<HTMLInputElement>) {
    setObjectName(event.target.value);
  }

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
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Bucket Name"
        value={bucketName}
        onChange={handleBucketNameChange}
        className="text-black"
      />
      <input
        type="text"
        placeholder="Object Name"
        value={objectName}
        onChange={handleObjectNameChange}
        className="text-black"
      />
      <input type="file" onChange={handleFileChange} className="text-white" />
      {file && (
        <div className="mb-4 text-sm text-white">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File type: {file.type}</p>
        </div>
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
      {file && uploadStatus !== "uploading" && (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={uploadFile}
          >
            Upload
          </button>

          {uploadStatus === "success" && (
            <p className="text-green-500">File uploaded successfully!</p>
          )}
          {uploadStatus === "error" && (
            <p className="text-red-500">Error uploading file!</p>
          )}
        </>
      )}
    </div>
  );
}
