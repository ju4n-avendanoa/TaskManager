import { Roboto_Mono } from "next/font/google";
import "../styles/Global.css";
import NavBar from "@/components/NavBar";

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
      <body className={`${roboto.className} bg-gray-800`}>
        <header className="h-1/5 p-5 bg-slate-900 w-full">
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
