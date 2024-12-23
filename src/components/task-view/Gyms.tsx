import { useGymItems } from "@/hooks/UseTaskGyms";
import { Gym } from "../types/Gym";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MiniGymCard from "./MiniGymCard";
import { useEffect } from "react";

type GymsProps = {
  initialTaskGyms: Gym[];
  onGymsChange: (gyms: Gym[]) => void;
};

export const Gyms = ({ initialTaskGyms, onGymsChange }: GymsProps) => {
  const { items, taskGyms, handleCheckedChange, loading, error } =
    useGymItems(initialTaskGyms);

  useEffect(() => {
    // Notify parent whenever `taskGyms` changes
    onGymsChange(taskGyms);
  }, [taskGyms, onGymsChange]);

  return (
    <div className="flex flex-row items-center">
      <label className="pr-5 w-1/5 text-gray-500">Gyms</label>
      <div className="flex flex-row flex-wrap w-4/5 gap-2 items-center">
        {taskGyms.map((gym) => (
          <MiniGymCard key={gym.id} gym={gym} />
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer text-black rounded-full pb-3 bg-slate-200 w-8 h-8 flex text-2xl"
            >
              +
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 z-[1100]"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuLabel>Select the gyms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {loading ? (
              <p className="px-4 py-2">Loading items...</p>
            ) : error ? (
              <p className="px-4 py-2 text-red-500">{error}</p>
            ) : (
              items.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.id}
                  checked={item.checked}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(item.id, checked)
                  }
                >
                  {item.gym.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
