import { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

/* ==========================================================
   Middleware
========================================================== */

export async function middleware(
  request: NextRequest
) {
  return await updateSession(request);
}

/* ==========================================================
   Config
========================================================== */

export const config = {
  matcher: [
    /*
     * Run middleware on all routes except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - image files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};