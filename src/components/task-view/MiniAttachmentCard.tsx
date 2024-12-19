import { Download, FileCode2, Trash2 } from "lucide-react";
import { Gym } from "../types/Gym";
import { Button } from "../ui/button";

type MiniAttachmentCardProps = {
  file?: File;
};

const MiniAttachmentCard = ({ file }: MiniAttachmentCardProps) => {
  return (
    <div className="flex flex-row flex-wrap w-28 gap-2 items-center justify-center">
      <FileCode2 className="w-14 h-14 text-gray-500" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs align-middle text-center p-1">Filename.png</p>
        <div className="flex flex-row gap-2 items-center">
          <Button className="h-7 w-7 bg-blue-400 text-black">
            <Download />
          </Button>
          <Button className="h-7 w-7 bg-red-400 text-black">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniAttachmentCard;
