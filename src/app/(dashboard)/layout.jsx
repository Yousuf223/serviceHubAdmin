"use client";
import "../globals.css";

import { useState } from "react";

import Sidebar from "@/components/custom/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import SuspenseBoundary from "@/components/ui/SuspenseBoundary";

function RootLayout({ children }) {
  const [sidebarSize, setSidebarSize] = useState(12);

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen w-full text-center rounded-lg border"
          >
            <ResizablePanel
              defaultSize={12}
              minSize={7}
              maxSize={12}
              onResize={(size) => setSidebarSize(size)}
            >
              <Sidebar sidebarSize={sidebarSize} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={78}>
              <SuspenseBoundary>
                <div className="p-6">{children}</div>
              </SuspenseBoundary>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
