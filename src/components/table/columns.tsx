import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../types/Task";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./column-header";
import { usePopup } from "../popups/PopupContext";
import axios from "axios";

export const columns = (fetchTasksData: () => void): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "gyms",
    header: "Gyms",
    cell: ({ row }) =>
      row.original.gyms?.length > 0
        ? row.original.gyms.map((gym) => `${gym.name}`).join(", ")
        : "No gyms assigned",
  },
  {
    accessorKey: "users",
    header: "Asignees",
    cell: ({ row }) =>
      row.original.users?.length > 0
        ? row.original.users.map((user) => user.name).join(", ")
        : "No assignees",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original; // Access the task data from the row

      const { toggleTaskView } = usePopup();

      const handleDelete = async () => {
        console.log(`Deleting task-${task.taskId}`);
        try {
          const response = await axios.delete(
            "http://maco-coding.go.ro:8010/tasks/delete",
            {
              params: { id: task.taskId },
            }
          );
          fetchTasksData();
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Task-{task.taskId}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toggleTaskView(task)}>
              View task details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
