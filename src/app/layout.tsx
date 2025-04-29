import type { Metadata } from "next";
import { switzer, poppins, geistMono } from "./styles/fonts";
import { Toaster } from "sonner";
import "./globals.css";
import { RegisterProvider } from "@/packages/ui/auth/register/context";
import AuthSession from "./lib/auth/auth-provider";
import { cn } from "@/packages/utils/functions/cn";
import { Provider } from "react-wrap-balancer";

export const metadata: Metadata = {
	title: "Onout",
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
      <body className="z-30">
        <AuthSession>
          <RegisterProvider>
            <Provider>
              <Toaster />
              {children}
            </Provider>
          </RegisterProvider>
        </AuthSession>
      </body>
    </html>
  );
}
