import type { ReactNode } from "react";
export const SectionHeading = ({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) => (
  <div className="border-b-2 border-black bg-white p-8 text-center sm:p-[7vw]">
    <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
      {kicker}
    </p>
    <h2 className="mb-6 font-mono text-4xl font-black leading-none sm:text-5xl">
      {title}
    </h2>
    {sub && (
      <p className="mx-auto mb-0 max-w-[680px] font-mono text-lg text-neutral-600">
        {sub}
      </p>
    )}
  </div>
);

export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="border-2 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide">
    {children}
  </span>
);
