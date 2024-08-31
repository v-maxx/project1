import "@/app/globals.css"
import {cn} from "@/lib/utils"

import {Suspense} from "react";
import Providers from "@/redux/Provider";
import {AuthProvider} from "@/lib/context/AuthContext";

export default function Layout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <Providers>
                <Suspense>
        <AuthProvider>

            {/*<Guard authGuard={false} guestGuard={true}>*/}
            <section> {children}</section>
            {/*</Guard>*/}
        </AuthProvider>
                    </Suspense>
            </Providers>


    )
}
