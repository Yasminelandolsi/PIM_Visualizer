import type { Metadata } from "next";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import Preheader from "./components/Home/Preheader";
import { ReduxProvider } from "./store/provider";
import LoadingSpinner from "./components/LoadingSpinner";
import { Suspense } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "PIMVIZ",
  description: "A Product Information Management System",
  icons: {
    icon: "/rubix.avif", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/rubix.avif" type="image/avif" />
      </head>
      <body className="antialiased">
        <ReduxProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex flex-col h-full w-full">
              <Preheader />
              <Header />
              {children}
              <Footer />
            </div>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
