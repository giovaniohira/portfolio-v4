import type { Metadata } from "next";
import { SiteBackground } from "@/components/SiteBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giovani Ohira — Software Engineer | UI/UX",
  description:
    "Giovani Ohira's portfolio. Full stack development, UI/UX, automated testing, and digital products focused on quality and experience.",
  openGraph: {
    title: "Giovani Ohira — Software Engineer | UI/UX",
    description:
      "Building digital experiences with purpose, performance, and accessibility.",
    type: "website",
  },
  themeColor: "#000000",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full overflow-x-hidden bg-bg-900 font-satoshi text-secondary antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <div className="relative flex min-h-screen flex-col [&>main]:flex-1">
              <SiteBackground />
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
