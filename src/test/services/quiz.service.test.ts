import { describe, it, expect, vi } from "vitest";
import { cacheManager } from "@/utils/cache";
import { startQuiz } from "@/services/quiz.service";

vi.mock("@/utils/cache", () => ({
  cacheManager: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe("quiz.service", () => {
  it("returns cached questions if available", async () => {
    const mockQuestions = [
      {
        id: "1",
        question: "Test question",
        options: ["a", "b", "c", "d"],
        correctAnswer: "a",
        topic: "Test",
      },
    ];

    vi.mocked(cacheManager.get).mockReturnValue({
      questions: mockQuestions,
      timestamp: Date.now(),
    });

    const result = await startQuiz("JavaScript", "Beginner", 10);
    expect(result).toEqual(mockQuestions);
  });
});
