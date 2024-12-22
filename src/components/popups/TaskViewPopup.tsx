import React, { useEffect, useState } from "react";
import { usePopup } from "./PopupContext";
import { Task } from "../types/Task";
import { DatePicker, Divider } from "rsuite";
import Multiselect from "multiselect-react-dropdown";
import { map } from "rsuite/esm/internals/utils/ReactChildren";
import MiniGymCard from "../task-view/MiniGymCard";
import MiniUserCard from "../task-view/MiniUserCard";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { set } from "date-fns";
import axios from "axios";
import { useAuth } from "../AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiEdit } from "react-icons/ci";
import { get } from "react-hook-form";
import { Gym } from "../types/Gym";
import { File, Image, FilePenLine, FileCode2, Check } from "lucide-react";
import MiniAttachmentCard from "../task-view/MiniAttachmentCard";

type TaskViewPopupProps = {
  task?: Task;
};

type Item = {
  id: number;
  gym: Gym;
  checked: boolean;
};

const TaskViewPopup = ({ task }: TaskViewPopupProps) => {
  const [items, setItems] = useState<Item[]>([]); // State to hold dynamic items
  const [loading, setLoading] = React.useState<boolean>(false); // State to handle loading

  const { isTaskViewOpen, openedTask, toggleTaskView } = usePopup();
  const { authState } = useAuth();
  const [deadline, setDeadline] = useState(task?.deadline || "");

  const [isEditingTitle, setIsEditingTitle] = useState(false); // Track edit mode
  const [editableTitle, setEditableTitle] = useState(task?.title || ""); // Editable title

  const [status, setStatus] = useState(task?.status || "Select status");
  const [statuses, setStatuses] = useState([]);

  const [category, setCategory] = useState(task?.category || "Select category");
  const [categories, setCategories] = useState([]);

  const [gyms, setGyms] = useState<Gym[]>([]);

  const taskGyms = task?.gyms.map((gym) => gym.id);

  async function getStatuses() {
    try {
      const result = await axios.get(
        `http://maco-coding.go.ro:8010/api/enum/statuses`
      );
      setStatuses(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching presigned url:", error);
    }
  }

  const getGyms = async () => {
    try {
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/gyms/all"
      );
      console.log("Gyms:", response.data);
      setGyms(response.data);
      setItemsArray(response.data);
    } catch (error) {
      console.error("Failed to fetch gyms:", error);
    }
  };

  const setItemsArray = (gyms: Gym[]) => {
    const itemsArray = gyms.map((gym) => ({
      id: gym.id,
      gym,
      checked: false,
    }));
    setItems(itemsArray);
  };

  // Handler to toggle the checked state of an item
  const handleCheckedChange = (id: number, checked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked } : item))
    );

    // Add or remove gyms from task.gyms
    const selectedGym = items.find((item) => item.id === id)?.gym;
    if (selectedGym && task) {
      const updatedGyms = checked
        ? [...task.gyms, selectedGym] // Add gym if checked
        : task.gyms.filter((gym) => gym.id !== id); // Remove gym if unchecked
      task.gyms = updatedGyms; // Update task.gyms dynamically
    }
  };

  async function getCategories() {
    try {
      const result = await axios.get(
        `http://maco-coding.go.ro:8010/api/enum/categories`
      );
      setCategories(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching presigned url:", error);
    }
  }

  useEffect(() => {
    getStatuses();
    getCategories();
    getGyms();
  }, []);

  //mark the item as checked that are also in the task.gyms array
  useEffect(() => {
    if (task) {
      const itemsArray = items.map((item) => ({
        ...item,
        checked: task.gyms.some((gym) => gym.id === item.id),
      }));
      setItems(itemsArray);
      console.log("Items array checked:", itemsArray);
    }
  }, [task]);

  useEffect(() => {
    // Update the status whenever the task changes
    if (task?.status) {
      setStatus(task.status);
    }
  }, [task?.status]);

  useEffect(() => {
    // Update the category whenever the task changes
    if (task?.category) {
      setCategory(task.category);
    }
  }, [task?.category]);

  useEffect(() => {
    // Update the editable title whenever the task changes
    if (task?.title) {
      setEditableTitle(task.title);
    }
  }, [task?.title]);

  console.log(
    !isTaskViewOpen,
    !task,
    task && openedTask?.taskId !== task.taskId
  );

  // Defensive check
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
        <div className="flex flex-row  justify-between items-center h-1/4">
          {/* Editable Task Title */}
          <h2 className="text-3xl font-bold text-left pr-2">
            Task-{task?.taskId}:
          </h2>
          {isEditingTitle ? (
            <div className="flex items-center grow gap-2 w-7/8">
              <input
                type="text"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="text-2xl font-bold text-left flex-grow p-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
              <Button
                onClick={() => {
                  setIsEditingTitle(false);
                }}
                className="bg-green-500 text-white"
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
                className="ml-2 text-black-500 items-center justify-center"
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
              task.status === "DONE" ? "bg-green-400" : "bg-yellow-400"
            }`}
          />
        </div>
        <div className="flex flex-row items-center py-1">
          <p className="text-gray-500 pr-2">Priority:</p>
            <Badge className={task?.priority === "High" ? "bg-red-500" : ""}>
            <p className="text-white">{task?.priority}</p>
            </Badge>
        </div>
        <Divider className="bg-gray-200 h-0.5" />
        <div className="gap-2 flex flex-col">
          <div className="flex flex-row items-center">
            <label className="pr-5 w-1/5 text-gray-500">Gyms</label>
            <div className="flex flex-row flex-wrap w-4/5 gap-2 items-center">
              {task?.gyms.map((gym) => (
                <MiniGymCard key={gym.id} gym={gym} />
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer rounded-full pb-3 bg-slate-200 w-8 h-8 flex text-2xl"
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
          <div className="flex flex-row items-center">
            <p className="w-1/5 text-gray-500">Status</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{status}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[1100]">
                <DropdownMenuLabel>Change status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={status}
                  onValueChange={setStatus}
                >
                  {statuses.map((categoryItem) => (
                    <DropdownMenuRadioItem
                      key={categoryItem}
                      value={categoryItem}
                    >
                      {categoryItem}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-row items-center">
            <p className="w-1/5 text-gray-500">Tags</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{category}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[1100]">
                <DropdownMenuLabel>Change tag</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={setCategory}
                >
                  {categories.map((statusItem) => (
                    <DropdownMenuRadioItem key={statusItem} value={statusItem}>
                      {statusItem}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-row items-center">
            <p className="w-1/5 text-gray-500">Created by</p>
            {authState.currentUser && (
              <MiniUserCard user={authState.currentUser} />
            )}
            <p className="text-gray-500 text-sm pl-5">
              //todo: this needs to change into the real creator of the task
            </p>
          </div>

          <div className="flex flex-row gap-2 pt-3">
            <label className="pr-5 w-1/5 text-gray-500">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full mx-5 p-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              placeholder="Enter task description..."
              required
            ></textarea>
          </div>
        </div>
        <Divider className="bg-gray-200 h-0.5 " />

        <div className="flex flex-col items-start gap-4">
          <p className="w-1/5 text-gray-500">Attachments</p>
          <div className="flex flex-row gap-6 items-center justify-center">
            <MiniAttachmentCard />
            <MiniAttachmentCard />
            <MiniAttachmentCard />
            <p className="cursor-pointer rounded-full pb-1 bg-slate-200 w-7 h-7 flex items-center justify-center text-2xl">
              +
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-2 pt-8">
          <Button className="w-full bg-[#494f4b] text-white rounded-md">
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
