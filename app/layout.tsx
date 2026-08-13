import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2027 大阪・京都 7 天旅行計畫",
  description: "2027/2/11–2/17 大阪與京都自由行：木津市場黑毛和牛、每日路線、在地美食、票券、日本製茶筅與預約待辦。",
  alternates: {
    canonical: "https://ericchoye.github.io/osaka-kyoto-trip-2027/",
  },
  openGraph: {
    title: "2027 大阪・京都 7 天 6 夜",
    description: "京都一日精華、木津市場黑毛和牛與可直接照走的每日路線。",
    type: "website",
    locale: "zh_TW",
    url: "https://ericchoye.github.io/osaka-kyoto-trip-2027/",
    images: [
      {
        url: "https://ericchoye.github.io/osaka-kyoto-trip-2027/og.png",
        width: 1731,
        height: 909,
        alt: "冬季大阪城、京都鳥居、黑毛和牛與抹茶旅行插畫",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2027 大阪・京都 7 天 6 夜",
    description: "京都一日精華、木津市場黑毛和牛與可直接照走的每日路線。",
    images: ["https://ericchoye.github.io/osaka-kyoto-trip-2027/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
