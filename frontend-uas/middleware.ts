import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req: any) {

  const url = req.nextUrl?.pathname;
  let role = req.nextauth?.token?.role;

  console.log("req", url);
  console.log("role", role);

  if (url.startsWith("/admin") === true) {
    if (role !== "admin") {
      return NextResponse.rewrite(new URL('/notaccess', req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (url.startsWith("/siswa") === true) {
    if (role !== "siswa") {
      return NextResponse.rewrite(new URL('/notaccess', req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (url.startsWith("/guru") === true) {
    if (role !== "guru") {
      return NextResponse.rewrite(new URL('/notaccess', req.url))
    } else {
      return NextResponse.next()
    }
  }


},
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: '/api/auth/error',
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/siswa", "/siswa/:path","/guru","/guru/:path"],
};
