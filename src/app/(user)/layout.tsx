'use client'
import "@/app/globals.css"
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import React, {Suspense, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
// import VerticalNavMenu from "@/components/navigation/VerticalNavMenu";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MenuIcon, SettingsIcon} from "lucide-react";
import {signOut, useSession} from "next-auth/react";

import {Badge, Box, Card, Flex, IconButton, Inset, Spinner, Strong, Switch} from "@radix-ui/themes";

import '@radix-ui/themes/styles.css';
import {AuthProvider} from "@/lib/context/AuthContext";
import Guard from "@/lib/guards/Guard";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {usePathname} from "next/navigation";
import {toast} from "react-toastify";
import isActive = toast.isActive;
import {useAuth} from "@/redux/store";
import Header from "@/components/@core/Header";
import Footer from "@/components/@core/Footer";



export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode;

}>) {
    const pathname=usePathname()
    const {user}=useAuth()
    const session=useSession()


    // const isActive=(path:string)=> pathname.includes(path)


    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };


    return (

        <section>

                <div className="">
                    <Suspense>
                    <AuthProvider>
                        {/*<Header/>*/}
                        {/*<Guard authGuard={true} guestGuard={false}>*/}
                    {children}
                        {/*</Guard>*/}
                        <Footer/>
                    </AuthProvider>
                    </Suspense>
                </div>



        </section>

    )
}
