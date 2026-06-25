import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // Define a CSS variable for Outfit
  weight: ["400", "700"], // Add the weights you need
});

export const metadata = {
  title: "Prisma - AI Course Generator & Personalized Learning Workspace",
  description: "Instantly transform any complex topic into structured, video-curated courses using Generative AI.",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap/> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
