import { CiEdit } from "react-icons/ci";
import { Button } from "../ui/button";
import { Task } from "../types/Task";
import { Check } from "lucide-react";

type EditableTitleProps = {
    task: Task;
    isEditingTitle: boolean;
    setIsEditingTitle: (isEditing: boolean) => void;
    setEditableTitle: (title: string) => void;
    editableTitle: string;    
}
export const EditableTitle = ({ task, isEditingTitle, setIsEditingTitle,setEditableTitle, editableTitle} : EditableTitleProps) => (
    <div className="flex flex-row justify-between items-center h-1/4">
      <h2 className="text-3xl font-bold text-left pr-2">
      Task-{task?.taskId}:
      </h2>
      
      {isEditingTitle ? (
      <div className="flex items-center grow gap-2 w-7/8">
        <input
        type="text"
        value={editableTitle}
        onChange={(e) => setEditableTitle(e.target.value)}
        className="text-2xl font-bold text-left flex-grow p-1 border rounded-lg shadow-sm focus:ring focus:ring-[#ec4899]"
        />
        <Button
        onClick={() => {
        setIsEditingTitle(false);
        }}
        className="bg-[#38463c] text-white"
        >
        Save
        </Button>
      </div>
      ) : (
      <h2 className="text-3xl font-bold text-left grow">
        {editableTitle}
        <Button
        variant="ghost"
        onClick={() => setIsEditingTitle(true)}
        className="ml-2 text-[#000000] items-center justify-center"
        >
        <CiEdit
        style={{
        width: "1.5em",
        height: "1.5em",
        }}
        />
        </Button>
      </h2>
      )}
      <Check
      className={`w-10 h-10 rounded-full ml-2 p-1 ${
        task.status === "DONE" ? "bg-[#81d9b9]" :
        task.status === "IN_PROGRESS" ? "bg-[#e1d089]" :
        task.status === "TO_DO" ? "bg-[#d388aa]" :
        task.status === "CANCELLED" ? "bg-[#e94949]" :
        task.status === "BACKLOG" ? "bg-[#4d6792]" : ""
      }`}
      />
      </div>
  );
  