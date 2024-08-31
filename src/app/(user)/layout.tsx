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
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

import '@radix-ui/themes/styles.css';
import UpgradeComponent from "@/app/@core/molecules/Upgrade";
import {AuthProvider} from "@/lib/context/AuthContext";
import Guard from "@/lib/guards/Guard";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {usePathname} from "next/navigation";
import {toast} from "react-toastify";
import isActive = toast.isActive;
import {useAuth} from "@/store/store";



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
            <div className="container mx-auto ">
                <div className="border border-gray-200 rounded-lg dark:border-gray-700 mt-2 shadow-lg">
                    <Suspense>
                    <AuthProvider>
                        {/*<Guard authGuard={true} guestGuard={false}>*/}
                    {children}
                        {/*</Guard>*/}
                    </AuthProvider>
                    </Suspense>
                </div>
            </div>


        </section>

    )
}
