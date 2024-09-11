import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/users", "/pogenerators"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  let verify = req.cookies.get("authenticated");
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (!verify && isProtectedRoute) {
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}/login`);
    return NextResponse.redirect(
      `https://top-value-brands-front.vercel.app/login`
    );
  }

  if (verify && isPublicRoute) {
    return NextResponse.redirect(`https://top-value-brands-front.vercel.app/`);
  }
}
