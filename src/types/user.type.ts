export interface TUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  address?: string;
  role: "user" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  passwordChangedAt?: Date;
}
