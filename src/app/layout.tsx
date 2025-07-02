import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/config/provider/query";
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner";
import { ThemeToggle } from "@/widgets/theme-toggle";

export const metadata: Metadata = {
  title: {
    template: "%s - Secret Shop",
    default: "Secret Shop",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem={true}
          >
            {children}
            <Toaster
              position={"top-right"}
              swipeDirections={["right", "top"]}
            />
            <ThemeToggle />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
