import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req: any) {

  const url = req.nextUrl?.pathname;
  let role = req.nextauth?.token?.role;

  console.log("req", url);
  console.log("role", role);

  if (url === "/landingpage") {
    return NextResponse.next();
  }

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
      authorized: ({ token,req }) => {
        const url = req.nextUrl?.pathname;

        // Izinkan akses ke halaman '/' tanpa autentikasi
        if (url === "/") {
          return true;
        }
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
  matcher: [ "/admin", "/admin/:path*", "/siswa", "/siswa/:path", "/guru", "/guru/:path"],
};
// import { NextRequest, NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req: any) {
//     const url = req?.nextUrl?.pathname;
//     const role = req?.nextauth?.token.role; 

//     console.log(req?.nextauth?.token.role);

//     if (url.startsWith("/admin") === true && role !== 'admin') {
//       return NextResponse.rewrite(new URL('/auth/notaccess', req.url));
//     }
    
//     if (url.startsWith("/peminjam") === true && role !== 'peminjam') {
//       return NextResponse.rewrite(new URL('/auth/notaccess', req.url));
//     }
    
//     if (url.startsWith("/petugas") === true && role !== 'petugas') {
//       return NextResponse.rewrite(new URL('/auth/notaccess', req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         if (token) return true;
//         return false;
//       },
//     },
//     pages: {
//       signIn: "/auth/login",
//       error: "/api/auth/error",
//     },
//   }
// );

// export const config = {
//   // matcher: ['/admin/:path*','/peminjam/:path*','/petugas/:path*']
//   // matcher: ['/admin', '/siswa', '/petugas', '/'] 
//    matcher: ['/admin', '/admin/:path*', '/peminjam', '/peminjam/:path*', '/petugas', '/petugas/:path*', '/']
// }