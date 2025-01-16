import { useAuth } from "../AuthProvider";
import MiniUserCard from "./MiniUserCard";

export const CreatedBy = () => {
  const { authState } = useAuth();
  return (
    <div className="flex flex-row items-center">
      <p className="w-1/5 text-gray-500">Created by</p>
      {authState.currentUser && <MiniUserCard user={authState.currentUser} />}
    </div>
  );
};
