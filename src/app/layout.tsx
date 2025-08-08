import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";


export const metadata: Metadata = {
  title: "Økter",
  description: "Økter - Workout tracker",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ theme: dark}}>
      <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
        <body className={'bg-[#141213] text-white'}>
        <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <h1 className={'text-lg'}>Økter</h1>
          <UserButton />
        </header>
          <main>
            <ThemeProvider>
              <SignedOut>
                <div className="flex min-h-screen items-center justify-center">
                  <SignIn routing="hash" />
                </div>
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </ThemeProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}