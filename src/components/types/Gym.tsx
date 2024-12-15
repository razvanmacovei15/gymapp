import { User } from "./User";

export type Gym = {
  id: number;
  name: string;
  address: string;
  manager: User;
};
