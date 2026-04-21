import { usePathname } from "next/navigation";

import { Navbar } from "@/components/common/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/contexts/AuthContext");
vi.mock("next/navigation");

describe("Navbar", () => {
  test("未ログイン時の表示内容が正しい", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: undefined,
      mutate: async () => {},
      logout: async () => {},
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navbar />);

    // Assert
    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ログイン" })).toBeInTheDocument();
  });

  test("未ログイン時かつログインページの場合の表示内容が正しい", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: undefined,
      mutate: async () => {},
      logout: async () => {},
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/login");
    render(<Navbar />);

    // Assert
    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "ログイン" }),
    ).not.toBeInTheDocument();
  });

  test("ログイン時の表示内容が正しい", async () => {
    // Arrange
    const logoutMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      me: {
        id: 1,
        name: "Taro Yamada",
        roles: ["user"],
        lastLoginAt: "2026-04-01T08:00:00.000Z",
      },
      mutate: async () => {},
      logout: logoutMock,
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navbar />);

    // Assert
    const logoutButton = screen.getByRole("button", { name: "ログアウト" });
    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    // Act
    await fireEvent.click(logoutButton);

    // Assert
    expect(logoutMock).toHaveBeenCalled();
  });
});
