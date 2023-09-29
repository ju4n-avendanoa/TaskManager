import { Roboto_Mono } from "next/font/google";
import "../styles/Global.css";
import NavBar from "@/components/NavBar";
import { Suspense } from "react";
import Provider from "@/context/Provider";

const roboto = Roboto_Mono({
  weight: ["300", "500"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <Provider session={session}>
        <body
          className={`${roboto.className} flex flex-col bg-gray-800 h-screen w-screen`}
        >
          <header className="h-auto p-5 bg-slate-900 w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <NavBar />
            </Suspense>
          </header>
          {children}
        </body>
      </Provider>
    </html>
  );
}
