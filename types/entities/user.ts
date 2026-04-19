export type UserEntityRole = "user" | "admin";

export type UserEntity = {
  id: number;
  name: string;
  email: string;
  roles: UserEntityRole[];
  createdAt: string;
  updatedAt: string;
};
