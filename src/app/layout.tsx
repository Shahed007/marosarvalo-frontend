import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// ❌ remove this (static metadata)
// export const metadata: Metadata = { ... }

// ✅ use dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
  // Example: fetch from API or config
  const siteName = "My Company";
  const description = "Dynamic description from server or config file";

  return {
    title: `${siteName} | Welcome`,
    description,
    openGraph: {
      title: `${siteName} | Welcome`,
      description,
      url: "https://example.com",
      siteName,
      images: [
        {
          url: "https://example.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "OpenGraph Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} antialiased font-inter`}>
        <AntdRegistry>
          <ConfigProvider>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
