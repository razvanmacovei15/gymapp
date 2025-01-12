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
import { User } from "../types/User";
import { z } from "zod";
import axios from "axios";
import { get } from "react-hook-form";

type TaskViewPopupProps = {
  initialTask?: Task;
  onTaskUpdate?: (task: Task) => void;
};

const TaskViewPopup = ({ initialTask, onTaskUpdate }: TaskViewPopupProps) => {
  const { statuses } = useTaskStatuses();
  const { categories } = useTaskCategories();

  const [task, setTask] = useState<Task | null>(initialTask || null);

  const { isTaskViewOpen, openedTask, toggleTaskView } = usePopup();
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task?.title || "");
  const [taskStatus, setTaskStatus] = useState(task?.status || "");
  const [taskCategory, setCategory] = useState(task?.category || "");
  const [updatedGyms, setUpdatedGyms] = useState<Gym[]>(task?.gyms || []);

  const [updatedAsignees, setUpdatedAsignees] = useState<User[]>(
    task?.users || []
  );

  const getTask = async (taskId: number) => {
    try {
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/get",
        {
          params: { id: taskId },
        }
      );
      setTask(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleSave = async () => {
    if (!task) return;

    const updatedTask = {
      ...task,
      title: editableTitle,
      description: description,
      deadline: deadline,
      status: taskStatus,
      category: taskCategory,
      gyms: updatedGyms,
      users: updatedAsignees,
    };

    try {
      // Save the updated task to the server
      const response = await axios.patch(
        "http://maco-coding.go.ro:8010/tasks/update",
        updatedTask,
        {
          params: {
            taskId: task.taskId, // Query parameter
          },
        }
      );

      // Update task state after saving
      setTask(response.data);

      if (onTaskUpdate) {
        onTaskUpdate(response.data);
      }

      getTask(task.taskId);
      return response.data;
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
          <Gyms initialTaskGyms={task?.gyms} onGymsChange={setUpdatedGyms} />
          <Asignees
            initialTaskAsignees={task?.users}
            onAsigneesChange={setUpdatedAsignees}
          />
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
          <Description
            description={description}
            setDescription={setDescription}
          />
        </div>
        <Divider className="bg-gray-200 h-0.5" />
        <Attachments taskId={task.taskId} />
        <div className="flex flex-row justify-between items-center gap-2 pt-8">
          <Button
            className="w-full bg-[#494f4b] text-white rounded-md"
            onClick={handleSave}
          >
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
