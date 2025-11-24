import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Where Winds Meet - Complete Guide & Wiki | Wuxia RPG Tips",
    template: "%s | Where Winds Meet Info"
  },
  description: "Master Where Winds Meet with our comprehensive guide featuring character builds, boss strategies, weapon tier lists, PC performance guides, and complete walkthroughs. Your ultimate companion for conquering the martial arts world.",
  keywords: [
    "Where Winds Meet",
    "Where Winds Meet guide",
    "Where Winds Meet wiki",
    "Wuxia RPG guide",
    "character builds",
    "boss strategies",
    "weapon tier list",
    "parry guide",
    "game guide"
  ],
  authors: [{ name: "Where Winds Meet Info Team" }],
  creator: "Where Winds Meet Info",
  publisher: "Where Winds Meet Info",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wherewindsmeetgame.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Where Winds Meet - Complete Wuxia RPG Guide & Wiki',
    description: 'Master Where Winds Meet with our comprehensive guide featuring character builds, boss strategies, weapon tier lists, and PC performance guides.',
    siteName: 'Where Winds Meet Info',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Where Winds Meet Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Winds Meet - Complete Wuxia RPG Guide & Wiki',
    description: 'Master Where Winds Meet with character builds, boss strategies, weapon tier lists, and performance guides.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}

        {/* Preconnect for ads */}
        <link rel="preconnect" href="//www.highperformanceformat.com" />
        <link rel="preconnect" href="//pl28123603.effectivegatecpm.com" />
        <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
        <link rel="dns-prefetch" href="//pl28123603.effectivegatecpm.com" />

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url(/images/backgrounds/winter-night.png)' }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ClientBody>
      </body>
    </html>
  );
}
