'use client'
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {ChevronDownIcon} from "lucide-react";
import {DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

const NavBar = () => {


    const pathname=usePathname()
    const session=useSession()
    return (
        <nav className="hidden md:flex space-x-4 mr-4">
            <Link href={'/'}>
                <Button  className={`${pathname===('/') ? 'bg-blue-600 text-white' :''}`}   variant="ghost">Home</Button>
            </Link>
            {session.data &&
<NavigationMenu>
            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <div className={`group inline-flex h-9 items-center justify-center rounded-md py-2 px-8 text-sm font-medium data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}>
                        My Account
                        {/*<ChevronDownIcon className="ml-2 h-4 w-4" />*/}
                    </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="grid w-[400px] p-2">
                        <NavigationMenuLink asChild>
                            <Link
                                href="/dashboard"
                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                <div className="text-sm font-medium leading-none group-hover:underline">Dashboard</div>

                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/referral"
                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                <div className="text-sm font-medium leading-none group-hover:underline">Referral</div>

                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/account"
                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                <div className="text-sm font-medium leading-none group-hover:underline">Profile</div>

                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/withdraw"
                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                <div className="text-sm font-medium leading-none group-hover:underline">Withdraw</div>

                            </Link>
                        </NavigationMenuLink>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
</NavigationMenu> }

            {!session.data?.user && <Link href={'/contact-us'}>
                <Button className={`${pathname.includes('/contact-us') ? 'bg-blue-600 text-white' : ''}`}
                        variant="ghost">Contact US</Button>
            </Link>}
            {!session.data?.user && <Link href={'/about-us'}>
                <Button className={`${pathname.includes('/about-us') ? 'bg-blue-600 text-white' : ''}`} variant="ghost">About
                    Us</Button>
            </Link>}
        </nav>
    );
};

export default NavBar;
