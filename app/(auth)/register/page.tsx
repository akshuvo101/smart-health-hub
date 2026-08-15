import AuthCard from "@/components/auth/auth-card";
import AuthShowcase from "@/components/auth/auth-showcase";

export default function RegisterPage() {
  return (
     <main className="min-h-dvh overflow-hidden bg-slate-50 dark:bg-slate-950">
          <div className="flex min-h-dvh w-full">
            {/* Left Showcase */}
    
            <AuthShowcase />
    
            {/* Right Login Area */}
    
            <section
              className="
                flex
                min-h-dvh
                flex-1
                items-center
                justify-center
                px-4
                py-5
                sm:px-6
                sm:py-6
                lg:px-8
                xl:px-12
              "
            >
              <AuthCard type="register" />
            </section>
          </div>
        </main>
  );
}