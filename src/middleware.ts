import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("topografia.")) {
    const { pathname } = request.nextUrl;

    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/topografia", request.url));
    }

    if (!pathname.startsWith("/topografia")) {
      return NextResponse.rewrite(
        new URL(`/topografia${pathname}`, request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
