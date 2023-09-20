import { Roboto_Mono } from "next/font/google";
import "../styles/Global.css";

const roboto = Roboto_Mono({
  weight: ["300", "500"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-800 h-screen`}>
        {children}
      </body>
    </html>
  );
}
