
import "@/app/globals.css"
import {cn} from "@/lib/utils"
import Guard from "@/lib/guards/Guard";
import {AuthProvider} from "@/lib/context/AuthContext";
import Providers from "@/store/Provider";
import {Suspense} from "react";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: 'Login',

};
export default function Layout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <Suspense>
                {/*<AuthProvider>*/}

                    {/*<Guard authGuard={false} guestGuard={true}>*/}
                        <section> {children}</section>
                    {/*</Guard>*/}
                {/*</AuthProvider>*/}
            </Suspense>
        </Providers>


    )
}
