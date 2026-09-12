import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
  priority?: boolean;
}

/** No video request until visible. Posters remain useful without autoplay/network. */
export function VideoPlayer({
  src,
  poster,
  label,
  className = "",
  priority = false,
}: VideoPlayerProps) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const explicitlyPlayed = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || !root.current) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = false;
    function sync() {
      if (
        visible &&
        !document.hidden &&
        (explicitlyPlayed.current ||
          (!motion.matches && !connection?.saveData)) &&
        !manuallyPaused.current
      ) {
        if (element) {
          if (!element.getAttribute("src")) {
            element.src = src;
            element.load();
          }
          void element.play().catch(() => setPlaying(false));
        }
      } else element?.pause();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      element.pause();
    };
  }, [src]);

  async function toggle() {
    const element = video.current;
    if (!element) return;
    if (playing) {
      manuallyPaused.current = true;
      element.pause();
    } else {
      manuallyPaused.current = false;
      explicitlyPlayed.current = true;
      setFailed(false);
      if (!element.getAttribute("src") || failed) {
        element.src = src;
        element.load();
      }
      try {
        await element.play();
      } catch {
        setFailed(true);
      }
    }
  }

  return (
    <div ref={root} className={`video-player ${className}`}>
      <img
        className="video-player__poster"
        src={poster}
        alt=""
        width="1280"
        height="720"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <video
        ref={video}
        aria-label={label}
        loop
        muted
        playsInline
        preload="none"
        className={ready ? "is-ready" : ""}
        onPlaying={() => {
          setReady(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setReady(false);
          setPlaying(false);
        }}
      />
      <button
        type="button"
        className="video-player__control"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : failed ? "Retry" : "Play"} ${label}`}
      >
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{" "}
        {playing ? "Pause" : failed ? "Retry film" : "Play"}
      </button>
      {failed && (
        <span className="video-player__error" role="status">
          Film unavailable. The still is shown; try again.
        </span>
      )}
    </div>
  );
}
