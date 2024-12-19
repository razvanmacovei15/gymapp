import { Task } from "../types/Task";

type DescriptionProps = {
    task: Task;
    setDescription: (deadline: string) => void;
    };
    
    const Description = ({ task, setDescription }: DescriptionProps) => {
    return (
      <div className="flex flex-row gap-2 pt-3">
        <label className="pr-5 w-1/5 text-gray-500">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mx-5 p-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          placeholder="Enter task description..."
          required
        ></textarea>
      </div>
    );
  };

export default Description;
