import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
// @ts-ignore: CSS module declaration missing
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meeya Engineering | Heavy Power Masters",
  description:
    "Meeya Engineering — Premium heavy machinery, hydraulic, engine, excavator, JCB and industrial repair services in Karadana, Bengamuwa. Owned & operated by Millwright Technician Mihisara Gamage.",
  keywords: [
    "Meeya Engineering",
    "Hydraulic Repair",
    "Excavator Repair",
    "JCB Repair",
    "Engine Repair",
    "Millwright Sri Lanka",
    "Heavy Machinery Repair",
  ],
  openGraph: {
    title: "Meeya Engineering | Heavy Power Masters",
    description: "Premium Heavy Machinery & Hydraulic Repair Services.",
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans bg-base text-[#F4F4F2] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
