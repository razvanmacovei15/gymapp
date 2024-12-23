import { Gym } from "../types/Gym";
import { File } from "lucide-react";

type MiniGymCardProps = {
  gym?: Gym;
};

const MiniGymCard = ({ gym }: MiniGymCardProps) => {
  return (

    <div className="bg-pink-900 rounded-full p-2 h-10 text-sm items-center justify-center">
      <p className="text-xs align-middle text-center p-1 text-white">Revo - {gym?.name}</p>
    </div>
  );
};

export default MiniGymCard;
