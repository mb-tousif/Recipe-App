import Navbar from '@/ui/NavBar';
import './globals.css'
import Footer from '@/ui/Footer';
import RootProvider from '@/libs/Provider';
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Recipe App",
  description: "A recipe app built with Next.js and Prisma.",
  icons: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RootProvider>
        <body>
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </body>
      </RootProvider>
    </html>
  );
}
