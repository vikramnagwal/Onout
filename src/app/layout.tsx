import type { Metadata } from "next";
import { switzer, poppins, geistMono } from "./styles/fonts";
import { Toaster } from "sonner";
import "./globals.css";
import { RegisterProvider } from "@/packages/ui/auth/register/context";
import AuthSession from "./lib/auth/auth-provider";
import { cn } from "@/packages/utils/functions/cn";



export const metadata: Metadata = {
	title: "Anom",
	description: "Send messages anonymously",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <html
      lang="en"
      className={cn(switzer.variable, poppins.variable, geistMono.variable)}
    >
      <body>
        <AuthSession>
          <RegisterProvider>
            <Toaster />
            {children}
          </RegisterProvider>
        </AuthSession>
      </body>
    </html>
  );
}
