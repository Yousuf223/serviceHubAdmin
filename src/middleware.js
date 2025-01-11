export function middleware(request) {
  const currentUser = request.cookies.get("token")?.value;
  if (currentUser && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
               