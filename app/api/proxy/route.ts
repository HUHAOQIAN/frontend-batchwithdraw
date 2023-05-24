import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 只对/api/proxy开头的路径进行代理
  if (pathname.startsWith("/api/proxy/")) {
    const newPathname = pathname.replace("/api/proxy", "");
    const newUrl = new URL(`https://aws.okx.com${newPathname}`);

    return NextResponse.rewrite(newUrl.toString());
  }

  return NextResponse.next();
}
