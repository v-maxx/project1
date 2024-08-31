'use client'
import "@/app/globals.css"
import React, {useState} from 'react';

import '@radix-ui/themes/styles.css';
import Guard from "@/lib/guards/Guard";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";


export default function Layout({children}: Readonly<{
    children: React.ReactNode;


}>) {


    return (

        <section>
            <Guard guestGuard={false} authGuard={true}>
                <NextSSRPlugin
                    /**
                     * The `extractRouterConfig` will extract **only** the route configs
                     * from the router to prevent additional information from being
                     * leaked to the client. The data passed to the client is the same
                     * as if you were to fetch `/api/uploadthing` directly.
                     */
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}

            </Guard>

        </section>

    )
}
