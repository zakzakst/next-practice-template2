export type AuthEntityRole = "user" | "admin";

export type AuthEntity = {
  id: number;
  email: string;
  password: string;
  roles: AuthEntityRole[];
  lastLoginAt: string;
};
