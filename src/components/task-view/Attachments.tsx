import { useRef } from "react";
import { Button } from "../ui/button";
import MiniAttachmentCard from "./MiniAttachmentCard";

export const Attachments = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const uploadFile = async () => {
    console.log("Uploading file...");
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
