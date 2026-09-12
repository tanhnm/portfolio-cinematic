import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { Tabs } from "../src/components/ui/Tabs";
import { CopyEmail } from "../src/components/ui/CopyEmail";
import { VideoPlayer } from "../src/components/VideoPlayer";
import { usePortfolioJourney } from "../src/hooks/usePortfolioJourney";

let reducedMotion = false;
let intersect: (entries: Partial<IntersectionObserverEntry>[]) => void;

beforeEach(() => {
  reducedMotion = false;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: reducedMotion,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof intersect) {
        intersect = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  Element.prototype.scrollIntoView = vi.fn();
  history.replaceState(null, "", "/");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function TabExample() {
  const [value, setValue] = useState(0);
  return (
    <Tabs
      label="Pipeline"
      items={[
        { value: 0, label: "Request" },
        { value: 1, label: "Protect" },
        { value: 2, label: "Deliver" },
      ]}
      value={value}
      onChange={setValue}
    >
      <p>Stage {value}</p>
    </Tabs>
  );
}

describe("keyboard navigation", () => {
  it("moves selection and focus together, wrapping in both directions", () => {
    render(<TabExample />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Request" }), {
      key: "ArrowLeft",
    });
    expect(document.activeElement).toBe(
      screen.getByRole("tab", { name: "Deliver" }),
    );
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      document.activeElement?.id,
    );
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(
      screen
        .getByRole("tab", { name: "Request" })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
  it("supports Home/End and leaves only the selected tab in the tab sequence", () => {
    render(<TabExample />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Request" }), {
      key: "End",
    });
    expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([
      -1, -1, 0,
    ]);
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([
      0, -1, -1,
    ]);
  });
});

describe("video lifecycle", () => {
  const film = (
    <VideoPlayer src="/film.mp4" poster="/still.webp" label="Coast" />
  );
  it("does not request the video until visible and pauses when leaving the viewport", async () => {
    const { container } = render(film);
    expect(container.querySelector("video")?.getAttribute("src")).toBeNull();
    await act(async () => intersect([{ isIntersecting: true }]));
    expect(container.querySelector("video")?.getAttribute("src")).toBe(
      "/film.mp4",
    );
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    vi.mocked(HTMLMediaElement.prototype.pause).mockClear();
    act(() => intersect([{ isIntersecting: false }]));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });
  it("respects reduced motion while still allowing deliberate playback", async () => {
    reducedMotion = true;
    const { container } = render(film);
    await act(async () => intersect([{ isIntersecting: true }]));
    expect(container.querySelector("video")?.getAttribute("src")).toBeNull();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Play Coast" })),
    );
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    await act(async () => intersect([{ isIntersecting: true }]));
    expect(container.querySelector("video")?.getAttribute("src")).toBe(
      "/film.mp4",
    );
  });
  it("keeps the still and offers recovery when the media fails", () => {
    const { container } = render(film);
    fireEvent.error(container.querySelector("video")!);
    expect(screen.getByRole("status").textContent).toContain(
      "Film unavailable",
    );
    expect(screen.getByRole("button", { name: "Retry Coast" })).toBeTruthy();
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/still.webp",
    );
  });
  it("does not override a deliberate pause when the video re-enters the viewport", async () => {
    const { container } = render(film);
    await act(async () => intersect([{ isIntersecting: true }]));
    fireEvent.playing(container.querySelector("video")!);
    fireEvent.click(screen.getByRole("button", { name: "Pause Coast" }));
    vi.mocked(HTMLMediaElement.prototype.play).mockClear();
    await act(async () => {
      intersect([{ isIntersecting: false }]);
      intersect([{ isIntersecting: true }]);
    });
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });
  it("keeps video detached when Save-Data is enabled", async () => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true },
    });
    const { container } = render(film);
    await act(async () => intersect([{ isIntersecting: true }]));
    expect(container.querySelector("video")?.getAttribute("src")).toBeNull();
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: undefined,
    });
  });
});

describe("contact feedback", () => {
  it("announces clipboard failure and preserves the address for manual use", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(<CopyEmail />);
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Copy email" })),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Select hnmtan03@gmail.com",
    );
  });
  it("announces success and clears pending feedback timers on unmount", async () => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { unmount } = render(<CopyEmail />);
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Copy email" })),
    );
    expect(screen.getByRole("status").textContent).toContain("copied");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("chapter transitions", () => {
  it("switches immediately for reduced motion without timers or a scroll lock", () => {
    vi.useFakeTimers();
    reducedMotion = true;
    const { result } = renderHook(usePortfolioJourney);
    act(() => result.current.changeMode("cinematic"));
    expect(result.current.mode).toBe("cinematic");
    expect(result.current.stage).toBe("idle");
    expect(vi.getTimerCount()).toBe(0);
    expect(document.body.style.overflow).toBe("");
  });
  it("supports skipping before the destination mounts and cancels obsolete timers", () => {
    vi.useFakeTimers();
    const { result } = renderHook(usePortfolioJourney);
    act(() => result.current.changeMode("cinematic"));
    expect(document.body.style.overflow).toBe("hidden");
    act(() => result.current.finish());
    expect(result.current.mode).toBe("cinematic");
    expect(result.current.stage).toBe("idle");
    expect(document.body.style.overflow).toBe("");
    expect(vi.getTimerCount()).toBe(0);
  });
  it("ignores duplicate transitions and restores scrolling after the full sequence", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(usePortfolioJourney);
    act(() => {
      result.current.changeMode("cinematic");
      result.current.changeMode("engineer");
    });
    act(() => vi.advanceTimersByTime(350));
    expect(result.current.mode).toBe("cinematic");
    expect(result.current.stage).toBe("cover");
    act(() => vi.advanceTimersByTime(4350));
    expect(result.current.stage).toBe("idle");
    expect(document.body.style.overflow).toBe("");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
