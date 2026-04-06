import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jarmo Isotalo",
  description:
    "Technology executive with over 10 years of experience in software engineering, data infrastructure, and engineering leadership.",
  openGraph: {
    title: "Jarmo Isotalo",
    description:
      "CTO at Token Terminal. Previously founding engineer at Vercel.",
    url: "https://jarmoisotalo.com",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/img/favicon/icon-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/img/favicon/icon-96x96.jpg", sizes: "96x96", type: "image/jpeg" },
    ],
    apple: "/img/favicon/icon-180x180.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
