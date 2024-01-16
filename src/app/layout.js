import Navbar from '@/ui/NavBar';
import './globals.css'
import Footer from '@/ui/Footer';
import RootProvider from '@/libs/Provider';

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
          {children}
          <Footer />
        </body>
      </RootProvider>
    </html>
  );
}
