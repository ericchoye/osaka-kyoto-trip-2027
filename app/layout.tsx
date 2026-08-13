import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2027 大阪・京都 7 天旅行計畫",
  description: "2027/2/11–2/17 大阪與京都自由行：每日路線、餐廳備案、木津市場早餐、清水寺抹茶、日本製茶筅與 Google 行事曆待辦。",
  alternates: {
    canonical: "https://ericchoye.github.io/osaka-kyoto-trip-2027/",
  },
  openGraph: {
    title: "2027 大阪・京都 7 天 6 夜",
    description: "梅田美食、木津市場早餐、清水寺抹茶與可加入 Google 行事曆的每日路線。",
    type: "website",
    locale: "zh_TW",
    url: "https://ericchoye.github.io/osaka-kyoto-trip-2027/",
    images: [
      {
        url: "https://ericchoye.github.io/osaka-kyoto-trip-2027/og.png",
        width: 1731,
        height: 909,
        alt: "冬季大阪、京都清水寺、拉麵、壽司與抹茶旅行插畫",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2027 大阪・京都 7 天 6 夜",
    description: "梅田美食、木津市場早餐、清水寺抹茶與可加入 Google 行事曆的每日路線。",
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
