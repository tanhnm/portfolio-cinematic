import { useId, type ReactNode } from "react";

interface TabItem<T extends string | number> {
  value: T;
  label: string;
}
interface TabsProps<T extends string | number> {
  label: string;
  items: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
}

export function Tabs<T extends string | number>({
  label,
  items,
  value,
  onChange,
  children,
}: TabsProps<T>) {
  const id = useId();
  return (
    <div className="tabs">
      <div
        className="tabs__list"
        role="tablist"
        aria-label={label}
        onKeyDown={(event) => {
          const current = items.findIndex((item) => item.value === value);
          let next = current;
          if (event.key === "ArrowRight") next = (current + 1) % items.length;
          else if (event.key === "ArrowLeft")
            next = (current - 1 + items.length) % items.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = items.length - 1;
          else return;
          event.preventDefault();
          onChange(items[next].value);
          event.currentTarget
            .querySelectorAll<HTMLButtonElement>('[role="tab"]')
            [next]?.focus();
        }}
      >
        {items.map((item) => (
          <button
            key={item.value}
            id={`${id}-${item.value}`}
            type="button"
            role="tab"
            aria-selected={value === item.value}
            aria-controls={`${id}-panel`}
            tabIndex={value === item.value ? 0 : -1}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="tabs__panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${value}`}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
