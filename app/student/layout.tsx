import { requireRole } from "@/lib/auth/require-role";
import StudentShell from "@/components/dashboard/student-shell";
import { ChatProvider } from "./chat/context/ChatContext";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["student"]);

  return (
    <StudentShell>
      <ChatProvider>
        {children}
      </ChatProvider>
    </StudentShell>
  );
}