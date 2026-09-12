import type { ReactNode } from "react";
/* Renders **bold** highlights inside a plain string */
export const renderBold = (text: string): ReactNode =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={part + i} className="font-black text-black">
        {part}
      </strong>
    ) : (
      part
    ),
  );
