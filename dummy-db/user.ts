import { UserEntity } from "@/types/entities/user";

export const users: UserEntity[] = [
  {
    id: 1,
    name: "Taro Yamada",
    email: "taro@example.com",
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    name: "Hanako Suzuki",
    email: "hanako@example.com",
    createdAt: "2026-04-02T09:30:00.000Z",
    updatedAt: "2026-04-02T09:30:00.000Z",
  },
  {
    id: 3,
    name: "Admin Ken",
    email: "admin@example.com",
    createdAt: "2026-04-03T10:45:00.000Z",
    updatedAt: "2026-04-03T10:45:00.000Z",
  },
];
