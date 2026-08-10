"use client";

import { ReactNode } from "react";

interface Props {
  header: ReactNode;
  children: ReactNode;
}

export default function ChatLayout({
  header,
  children,
}: Props) {
  return (
    <section
      className="
        flex
        h-[calc(100dvh-0px)]
        min-h-0
        flex-1
        overflow-hidden

        bg-slate-50

        dark:bg-slate-950
      "
    >
      {/* Header + Main */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        {header}

        <main
          className="
            min-h-0
            flex-1
            overflow-hidden
          "
        >
          {children}
        </main>
      </div>
    </section>
  );
}