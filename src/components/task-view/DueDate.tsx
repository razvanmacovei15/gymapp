import { Task } from "../types/Task";

type DueDateProps = {
    task: Task;
    setDeadline: (deadline: string) => void;
}

export const DueDate = ({task, setDeadline} : DueDateProps) => {
    return (
        <div className="flex flex-row items-center ">
            <p className="w-1/5 text-gray-500">Due date</p>
            <input
              type="date"
              name="deadline"
              value={task?.deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-1/4 p-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div> 
    )
}