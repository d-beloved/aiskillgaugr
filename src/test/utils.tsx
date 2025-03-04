import { render } from "@testing-library/react";
import { QuizProvider } from "@/contexts/QuizContext";
import { vi } from "vitest";

export function renderWithProviders(ui: React.ReactElement) {
  vi.mock("@/utils/session", () => ({
    sessionManager: {
      recoverSession: vi.fn(),
      recoverPreferences: vi.fn(),
      recoverRecommendation: vi.fn(),
      recoverQuizResult: vi.fn(),
      save: vi.fn(),
      updateSession: vi.fn(),
      saveQuizResult: vi.fn(),
      saveRecommendation: vi.fn(),
      clear: vi.fn(),
      create: vi.fn(),
    },
  }));

  vi.mock("@/utils/analytics", () => ({
    event: vi.fn(),
  }));

  return render(ui, {
    wrapper: ({ children }) => <QuizProvider>{children}</QuizProvider>,
  });
}
