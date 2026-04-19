import { AuthEntity } from "@/types/entities/auth";

export const auths: AuthEntity[] = [
  {
    id: 1,
    email: "taro@example.com",
    password: "password123",
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    email: "hanako@example.com",
    password: "securepass456",
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
];
