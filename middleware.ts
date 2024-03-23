import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    authPrefix
} from '@/routes'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiRoutes = req.nextUrl.pathname.startsWith(authPrefix)
    const isAdminRoutes = req.nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT)

    if (isApiRoutes) return;

    if (!isLoggedIn && isAdminRoutes) {
        return Response.redirect(new URL('/login', nextUrl))
    }

})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}