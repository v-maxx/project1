'use client'
import "@/app/globals.css"
import React, {useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SettingsIcon} from "lucide-react";
import {signOut} from "next-auth/react";
import {Badge, Box, Card, Flex, IconButton, Inset, Spinner, Strong, Switch} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

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
