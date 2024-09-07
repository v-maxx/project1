import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/lib/auth/Provider";
import Providers from "@/redux/Provider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Sukanya Card", description: "Apply For Sukanya Card",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en">
        <body className={inter.className}>
        <NextAuthProvider>
            <Providers>
                <ToastContainer/>
                {children}
            </Providers>
        </NextAuthProvider>
        </body>
        </html>);
}
