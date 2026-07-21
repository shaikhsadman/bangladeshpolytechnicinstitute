import './globals.css';

export const metadata = {
  title: 'Bangladesh Polytechnic Institute — Student Management System',
  description: 'Bangladesh Polytechnic Institute Student Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
