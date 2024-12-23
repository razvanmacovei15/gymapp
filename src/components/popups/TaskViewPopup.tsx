import { useEffect, useState } from "react";
import { usePopup } from "./PopupContext";
import { Task } from "../types/Task";
import { Divider } from "rsuite";
import MiniUserCard from "../task-view/MiniUserCard";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "../AuthProvider";
import { CiEdit } from "react-icons/ci";
import { Gym } from "../types/Gym";
import { Check } from "lucide-react";
import { useGymItems } from "@/hooks/UseTaskGyms";
import { useTaskStatuses } from "@/hooks/UseTaskStatuses";
import { useTaskCategories } from "@/hooks/UseTaskCategories";
import { Attachments } from "../task-view/Attachments";
import Description from "../task-view/Description";
import { CreatedBy } from "../task-view/CreatedBy";
import { Categeories } from "../task-view/Categories";
import { Status } from "../task-view/Status";
import { DueDate } from "../task-view/DueDate";
import { Gyms } from "../task-view/Gyms";
import { Asignees } from "../task-view/Asignees";
import { EditableTitle } from "../task-view/EditableTitle";
import { set } from "date-fns";

type TaskViewPopupProps = {
  task?: Task;
};

const TaskViewPopup = ({ task }: TaskViewPopupProps) => {
  const { statuses } = useTaskStatuses();
  const { categories } = useTaskCategories();

  const { isTaskViewOpen, openedTask, toggleTaskView } = usePopup();
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task?.title || "");
  const [taskStatus, setTaskStatus] = useState(task?.status || "");
  const [taskCategory, setCategory] = useState(task?.category || "");
  const [updatedGyms, setUpdatedGyms] = useState<Gym[]>(task?.gyms || []); // Track updated gyms

  useEffect(() => {
    if (task?.status) {
      setTaskStatus(task.status);
    }
  }, [task?.status]);

  useEffect(() => {
    if (task?.category) {
      setCategory(task.category);
    }
  }, [task?.category]);

  useEffect(() => {
    if (task?.title) {
      setEditableTitle(task.title);
    }
  }, [task?.title]);

  const handleSave = async () => {
    if (!task) return;

    const updatedTask = {
      ...task,
      title: editableTitle,
      description,
      deadline,
      status: taskStatus,
      category: taskCategory,
      gyms: updatedGyms,
    };

    try {
      console.log("Saving task:", updatedTask);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!isTaskViewOpen || !task || openedTask?.taskId !== task.taskId)
    return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]"
      onClick={() => task && toggleTaskView(task)}
    >
      <div
        className=" bg-white border border-gray-300 rounded-2xl p-10 z-[1000] w-4/6 flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <EditableTitle
          task={task}
          isEditingTitle={isEditingTitle}
          setIsEditingTitle={setIsEditingTitle}
          setEditableTitle={setEditableTitle}
          editableTitle={editableTitle}
        />
        <div className="flex flex-row items-center py-1">
          <p className="text-gray-500 pr-2">Priority:</p>
            <Badge className={task?.priority === "High" ? "bg-red-500" : ""}>
            <p className="text-white">{task?.priority}</p>
            </Badge>
        </div>
        <Divider className="bg-gray-200 h-0.5" />
        <div className="gap-2 flex flex-col">
          <Gyms
            initialTaskGyms={task?.gyms || []}
            onGymsChange={setUpdatedGyms}
          />
          <Asignees task={task} />
          <DueDate task={task} setDeadline={setDeadline} />
          <Status
            statuses={statuses}
            taskStatus={taskStatus}
            setTaskStatus={setTaskStatus}
          />
          <Categeories
            categories={categories}
            taskCategory={taskCategory}
            setCategory={setCategory}
          />
          <CreatedBy />
          <Description task={task} setDescription={setDescription} />
        </div>
        <Divider className="bg-gray-200 h-0.5" />
        <Attachments />
        <div className="flex flex-row justify-between items-center gap-2 pt-8">
          <Button className="w-full bg-[#494f4b] text-white rounded-md" onClick={handleSave}>
            <span>Save</span>
          </Button>
          <Button
            onClick={() => task && toggleTaskView(task)}
            className="w-full  bg-[#932636] text-white rounded-md"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewPopup;
