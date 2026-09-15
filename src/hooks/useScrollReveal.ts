import { useLayoutEffect, type RefObject } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

/** Viewport entrance effects without per-frame scroll work. */
export function useScrollReveal(
  root: RefObject<HTMLElement | null>,
  contentKey: string,
) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("has-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const observeItem = (item: HTMLElement) => {
      if (!item.classList.contains("is-visible")) observer.observe(item);
    };
    items.forEach(observeItem);

    // Lazy-loaded case studies and chapter content arrive after the first paint.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR)) observeItem(node);
          node
            .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
            .forEach(observeItem);
        });
      });
    });
    mutations.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [contentKey, root]);
}
