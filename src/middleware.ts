import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ['/', '/users', '/pogenerators']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest){
    let verify = req.cookies.get("authenticated")
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    
    if(!verify && isProtectedRoute){
        return NextResponse.redirect('http://localhost:3000/login')
    }

    if(verify && isPublicRoute){
        return NextResponse.redirect('http://localhost:3000/')
    }

}