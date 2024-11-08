import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/users", "/pogenerators"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // console.log('Request Path:', req.nextUrl.pathname);
  // console.log('Authenticated Cookie:', req.cookies.get("authenticated"));

  let verify = req.cookies.get("authenticated");
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // console.log('Is Protected Route:', isProtectedRoute);
  // console.log('Is Public Route:', isPublicRoute);

  if (!verify && isProtectedRoute) {
    console.log("Redirecting to login...");
    // console.log(`${process.env.NEXT_PUBLIC_FRONT_URL}/login`)
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}/login`);
  }

  if (verify && isPublicRoute) {
    // console.log('Redirecting to home...');
    // console.log(`${process.env.NEXT_PUBLIC_FRONT_URL}/`);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}/`);
  }

  return NextResponse.next();
}
