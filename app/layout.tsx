import './globals.css';
import Header from './components/Header';

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
        <Header />
        {children}
      </body>
    </html>
  );
}
