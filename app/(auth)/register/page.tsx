import AuthCard from "@/components/auth/auth-card";
import AuthShowcase from "@/components/auth/auth-showcase";

export default function RegisterPage() {
  return (
    <div className="min-h-screen lg:flex">
      <AuthShowcase />

      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <AuthCard type="register" />
      </div>
    </div>
  );
}