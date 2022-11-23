// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/transactions", "/"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
