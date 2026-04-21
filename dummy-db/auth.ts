import { AuthEntity } from "@/types/entities/auth";

export const auths: AuthEntity[] = [
  {
    id: 1,
    email: "taro@example.com",
    password: "password123",
    roles: ["user"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    email: "hanako@example.com",
    password: "securepass456",
    roles: ["user"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "securepass456",
    roles: ["admin"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
];
