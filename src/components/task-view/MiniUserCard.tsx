import axios from "axios";
import { useAuth } from "../AuthProvider";
import { Gym } from "../types/Gym";
import { User } from "../types/User";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

type MiniUserCardProps = {
  user?: User;
};

const MiniUserCard = ({ user }: MiniUserCardProps) => {
  const [presignedUrl, setPresignedUrl] = useState<string>("");

  //todo method that gets managers presignedurl

  async function getPresignedUrl() {
    try {
      const result = await axios.get(
        `http://maco-coding.go.ro:8010/minio/generate-manager-url`,
        {
          params: {
            userId: user?.id,
          },
        }
      );
      setPresignedUrl(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching presigned url:", error);
    }
  }

  useEffect(() => {
    getPresignedUrl();
  }, []);

  return (
    <div className="flex flex-row bg-pink-900 rounded-full p-1 h-10 text-sm items-center justify-center">
      <Avatar className="h-8 w-8 mr-2 ">
        <AvatarImage src={presignedUrl} />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <p className="text-xs align-middle text-center p-1 text-white">
        {user?.name}
      </p>
    </div>
  );
};

export default MiniUserCard;
