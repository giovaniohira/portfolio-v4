import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giovani Ohira — Engenheiro de Software | UI/UX",
  description:
    "Portfólio de Giovani Ohira. Desenvolvimento full stack, UI/UX, testes automatizados e produtos digitais com foco em qualidade e experiência.",
  openGraph: {
    title: "Giovani Ohira — Engenheiro de Software | UI/UX",
    description:
      "Criando experiências digitais com propósito, performance e acessibilidade.",
    type: "website",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full overflow-x-hidden bg-bg-900 font-satoshi text-secondary antialiased">
        {children}
      </body>
    </html>
  );
}
