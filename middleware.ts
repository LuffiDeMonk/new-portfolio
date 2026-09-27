import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    authPrefix,
    AUTH_ROUTES
} from '@/routes'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiRoutes = req.nextUrl.pathname.startsWith(authPrefix)
    const isAdminRoutes = req.nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT)
    const isAuthRoutes = AUTH_ROUTES.includes(req.nextUrl.pathname)

    if (isApiRoutes) return;

    if (!isLoggedIn && isAdminRoutes) {
        return Response.redirect(new URL('/login', nextUrl))
    }
    if (isLoggedIn) {
        if (isAuthRoutes) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}