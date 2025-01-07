import { Download, FileCode2, Trash2 } from "lucide-react";
import { Gym } from "../types/Gym";
import { Button } from "../ui/button";

type MiniAttachmentCardProps = {
  file?: string;
  onDownload?: (file: string) => void;
  onDelete?: (file: string) => void;
};

const MiniAttachmentCard = ({
  file,
  onDownload,
  onDelete,
}: MiniAttachmentCardProps) => {
  return (
    <div className="flex flex-row flex-wrap w-28 gap-2 items-center justify-center">
      <FileCode2 className="w-14 h-14 text-gray-500" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs align-middle text-center p-1">{file}</p>
        <div className="flex flex-row gap-2 items-center">
          <Button
            className="h-7 w-7 bg-[#8ca4d1] text-black"
            onClick={() => file && onDownload && onDownload(file)}
          >
            <Download />
          </Button>
          <Button
            className="h-7 w-7 bg-[#cb746a] text-black"
            onClick={() => file && onDelete && onDelete(file)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniAttachmentCard;
