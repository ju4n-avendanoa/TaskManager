import { Roboto_Mono } from "next/font/google";
import axios from "axios";
import "../styles/Global.css";

export const axiosInstance = axios.create({
  // baseURL: "https://nextjs-ju4n-avendanoa.vercel.app/api/tasks",
  baseURL: "http://localhost:3000/api/tasks",
});

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
