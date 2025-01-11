"use client";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import SuspenseBoundary from "@/components/ui/SuspenseBoundary";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <SuspenseBoundary>{children}</SuspenseBoundary>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
