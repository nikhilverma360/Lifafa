import "./globals.css";
import { Inter } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { ThirdwebProvider } from "./ThirdwebProvider";
import { Sepolia } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sismo Connect Offchain Starter",
  description: "A starter Next.js repository for Sismo Connect offchain apps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers><ThirdwebProvider activeChain={ Sepolia } >{children}</ThirdwebProvider></Providers></body>
    </html>
  );
}
