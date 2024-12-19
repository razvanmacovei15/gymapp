import { Gym } from "../types/Gym";
import { File } from "lucide-react";

type MiniGymCardProps = {
  gym?: Gym;
};

const MiniGymCard = ({ gym }: MiniGymCardProps) => {
  return (
    <div className="bg-slate-200 rounded-full p-1 h-8 text-sm items-center justify-center">
      <p className="text-xs align-middle text-center p-1">Revo - {gym?.name}</p>
    </div>
  );
};

export default MiniGymCard;
