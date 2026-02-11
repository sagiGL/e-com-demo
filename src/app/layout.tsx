import type { Metadata } from "next";
import "./globals.css";
import { SearchDropdownComponent } from "@/components/search-dropdown";
import { MenuIcon } from "lucide-react";
import { Suspense } from "react";
import { Cart } from "@/components/cart";
import { AuthServer } from "./auth.server";
import { Link } from "@/components/ui/link";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { WelcomeToast } from "./welcome-toast";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | e-pen",
    default: "e-pen",
  },
  description: "Your premium pen & stationery destination",
};

export const revalidate = 86400; // One day

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex flex-col overflow-y-auto overflow-x-hidden antialiased`}
      >
        <div>
          <header className="fixed top-0 z-20 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 items-center gap-4 px-4 sm:gap-6 sm:px-6">
              {/* Logo */}
              <Link
                prefetch={true}
                href="/"
                className="flex items-center shrink-0"
              >
                <img
                  src="/logo.png"
                  alt="ePen"
                  className="h-9 w-auto"
                />
              </Link>

              {/* Search - centered */}
              <div className="hidden flex-1 justify-center sm:flex">
                <div className="w-full max-w-lg">
                  <SearchDropdownComponent />
                </div>
              </div>

              {/* Right actions */}
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <Suspense
                  fallback={
                    <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100">
                      <div className="h-[20px]" />
                      <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
                        <polygon points="0,0 5,6 10,0"></polygon>
                      </svg>
                    </button>
                  }
                >
                  <AuthServer />
                </Suspense>

                <div className="h-5 w-px bg-gray-200 hidden sm:block" />

                <Link
                  prefetch={true}
                  href="/order-history"
                  className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                  Orders
                </Link>

                <div className="relative">
                  <Link
                    prefetch={true}
                    href="/order"
                    className="flex items-center gap-1.5 rounded-lg bg-accent1 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent1/90 hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    <span className="hidden sm:inline">Cart</span>
                  </Link>
                  <Suspense>
                    <Cart />
                  </Suspense>
                </div>

                <Link
                  prefetch={true}
                  href="/order-history"
                  aria-label="Order History"
                  className="flex items-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Mobile search bar */}
            <div className="border-t border-gray-100 px-4 py-2 sm:hidden">
              <SearchDropdownComponent />
            </div>
          </header>
          <div className="pt-16 sm:pt-16">{children}</div>
        </div>
        <footer className="mt-auto border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:py-4">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-500 sm:justify-start">
                <span className="cursor-pointer transition-colors hover:text-accent1">Home</span>
                <span className="text-gray-300">·</span>
                <span className="cursor-pointer transition-colors hover:text-accent1">FAQ</span>
                <span className="text-gray-300">·</span>
                <span className="cursor-pointer transition-colors hover:text-accent1">Returns</span>
                <span className="text-gray-300">·</span>
                <span className="cursor-pointer transition-colors hover:text-accent1">Careers</span>
                <span className="text-gray-300">·</span>
                <span className="cursor-pointer transition-colors hover:text-accent1">Contact</span>
              </div>
              <div className="text-center text-xs text-gray-400 sm:text-right">
                Built with{" "}
                <Link
                  href="https://github.com/ethanniser/NextFaster"
                  className="font-semibold text-accent1 transition-colors hover:text-blue-700"
                  target="_blank"
                >
                  e-pen
                </Link>
              </div>
            </div>
          </div>
        </footer>
        {/* does putting this in suspense do anything? */}
        <Suspense fallback={null}>
          <Toaster closeButton />
          <WelcomeToast />
        </Suspense>
        <Analytics scriptSrc="/insights/events.js" endpoint="/hfi/events" />
        <SpeedInsights />
      </body>
    </html>
  );
}
