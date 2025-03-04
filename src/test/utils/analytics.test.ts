import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { event, pageview } from "@/utils/analytics";

describe("analytics", () => {
  const mockGtag = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("gtag", mockGtag);
    mockGtag.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("tracks pageviews correctly", () => {
    vi.stubEnv("PUBLIC_ENV__GOOGLE_ANALYTICS", "G-TESTID");

    pageview("/test");

    expect(mockGtag).toHaveBeenCalledWith("config", "G-TESTID", {
      page_path: "/test",
    });
  });

  it("tracks custom events correctly", () => {
    event({
      action: "test_action",
      category: "Test",
      label: "test_label",
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "test_action", {
      event_category: "Test",
      event_label: "test_label",
    });
  });
});
