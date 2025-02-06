import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2️⃣0️⃣🤓",
  description: "20 Emojis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
