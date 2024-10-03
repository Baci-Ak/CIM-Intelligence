import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer'; // Import the Footer

export const metadata = {
  title: 'CIM Intelligence',
  description: 'Your gateway to mastering Data Science!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />   {/* Renders the global header */}
        <main>{children}</main>   {/* This is where the content of each page will be rendered */}
        <Footer />   {/* Footer is placed at the bottom of every page */}
      </body>
    </html>
  );
}
