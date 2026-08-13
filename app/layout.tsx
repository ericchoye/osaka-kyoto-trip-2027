import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2027 大阪・京都 7 天旅行計畫",
  description: "2027/2/11–2/17 大阪、京都與宇治自由行：每日路線、在地美食、票券、日本製茶筅與預約待辦。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
