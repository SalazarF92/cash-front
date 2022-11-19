// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/transfer", "/transactions"];

export async function middleware(request: NextRequest) {
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
