import { Task } from "../types/Task";
import MiniUserCard from "./MiniUserCard";

type AsigneesProps = {
    task: Task;
}

export const Asignees = ({task} : AsigneesProps) => {
    return (
        <div className="flex flex-row items-center">
            <label className="pr-5 w-1/5 text-gray-500">Asignees</label>
            <div className="flex flex-row flex-wrap w-4/5 gap-2 items-center">
              {task?.users.map((user) => (
                <MiniUserCard key={user.id} user={user} />
              ))}

              <p className="cursor-pointer rounded-full pb-1 bg-slate-200 w-7 h-7 flex items-center justify-center text-2xl">
                +
              </p>
            </div>
          </div> 
    )
}