import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Task } from "../types/Task";
import axios from "axios";

interface TaskTableProps {
  tasks: Task[]; // Replace `any` with the appropriate type if `tasks` have a defined structure
  loading: boolean;
  error: string | null;
  fetchTasksData: () => void;
}

export default function TaskTable({
  tasks,
  loading,
  error,
  fetchTasksData,
}: TaskTableProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns(fetchTasksData)} data={tasks} />
    </div>
  );
}
