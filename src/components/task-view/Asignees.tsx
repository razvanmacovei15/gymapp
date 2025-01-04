import { Task } from "../types/Task";
import MiniUserCard from "./MiniUserCard";
import { User } from "../types/User";
import { useTaskAsignees } from "@/hooks/UseTaskAsignees";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type AsigneesProps = {
  initialTaskAsignees: User[];
  onAsigneesChange: (asignees: User[]) => void;
};

export const Asignees = ({
  initialTaskAsignees,
  onAsigneesChange,
}: AsigneesProps) => {
  const { items, taskAsignees, handleCheckedChange, loading, error } =
    useTaskAsignees(initialTaskAsignees);

  useEffect(() => {
    // Notify parent whenever `taskAsignees` changes
    onAsigneesChange(taskAsignees);
  }, [taskAsignees, onAsigneesChange]);

  return (
    <div className="flex flex-row items-center">
      <label className="pr-5 w-1/5 text-gray-500">Asignees</label>
      <div className="flex flex-row flex-wrap w-4/5 gap-2 items-center">
        {taskAsignees.map((user) => (
          <MiniUserCard key={user.id} user={user} />
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
            <DropdownMenuLabel>Select the asignees</DropdownMenuLabel>
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
                  {item.user.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
