import { Gym } from "./Gym";
import { User } from "./User";

export type Task = {
  taskId: number;
  title: string;
  gyms: Gym[];
  users: User[];
  status: string;
  priority: string;
  deadline: string;
  category: string;
  description: string;
};
