// app/middleware.ts (or project root if outside /app)

import { NextRequest, NextResponse } from "next/server";

// Define routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/api/create-emo",
  "/api/get-my-emotions",
  "/new-analytics",

];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!requiresAuth) {
    return NextResponse.next(); // Allow through
  }

  // Read token from cookies (e.g., 'token' is the cookie name)
  const token = request.cookies.get("emograph-token")?.value;

 

  if (!token) {
    // Redirect to login or return 401 for APIs
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const loginUrl = new URL("/auth/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If token exists, allow request to proceed
  return NextResponse.next();
}
