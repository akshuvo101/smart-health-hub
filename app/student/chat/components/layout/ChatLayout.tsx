// "use client";

// import { ReactNode } from "react";

// /* ==========================================================
//    Props
// ========================================================== */

// interface ChatLayoutProps {
//   header: ReactNode;
//   children: ReactNode;
// }

// /* ==========================================================
//    Component
// ========================================================== */

// export default function ChatLayout({
//   header,
//   children,
// }: ChatLayoutProps) {
//   return (
//     <section
//       className="
//         flex

//         h-full
//         min-h-0
//         min-w-0
//         flex-1
//         flex-col

//         overflow-hidden

//         bg-gradient-to-b

//         from-slate-50
//         via-white
//         to-slate-100

//         dark:from-slate-950
//         dark:via-[#0B1120]
//         dark:to-[#111827]
//       "
//     >
//       {/* ======================================================
//           Header
//       ====================================================== */}

//       <header
//         className="
//           shrink-0

//           border-b
//           border-slate-200/60

//           bg-white/80

//           backdrop-blur-2xl

//           supports-[backdrop-filter]:bg-white/70

//           dark:border-slate-800
//           dark:bg-slate-950/80
//           dark:supports-[backdrop-filter]:bg-slate-950/70
//         "
//       >
//         {header}
//       </header>

//       {/* ======================================================
//           Body
//       ====================================================== */}

//       <main
//         className="
//           flex
//           flex-1

//           min-h-0
//           min-w-0

//           overflow-hidden

//           relative
//         "
//       >
//         {children}
//       </main>
//     </section>
//   );
// }


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
        h-full
        min-h-0
        flex-1
        flex-col
        overflow-hidden
      "
    >
      <header className="shrink-0">
        {header}
      </header>

      <main
        className="
          flex-1
          min-h-0
          overflow-hidden
        "
      >
        {children}
      </main>
    </section>
  );
}