'use client'
import "@/app/globals.css"
import React, {useState} from 'react';

import '@radix-ui/themes/styles.css';
import Guard from "@/lib/guards/Guard";


export default function Layout({children}: Readonly<{
    children: React.ReactNode;


}>) {


    return (

        <section>
            <Guard guestGuard={false} authGuard={true}>

                {children}

            </Guard>

        </section>

    )
}
