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
                <Button  className={`${pathname===('/') ? 'bg-blue-600 text-white hover:bg-blue-500' :''}`}   variant="ghost">Home</Button>
            </Link>
            {session.data &&
                <div className="grid p-2">
                    {/*<NavigationMenuLink asChild>*/}
                        <Link
                            href="/dashboard"
                            className="group grid h-auto w-full items-center"
                            prefetch={false}
                        >
                            <div className="text-sm font-medium leading-none group-hover:underline">Dashboard</div>

                        </Link>
                    {/*</NavigationMenuLink>*/}

                </div>
// <NavigationMenu>
//
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>
//                     <div className={`group inline-flex h-9 items-center justify-center rounded-md py-2 px-8 text-sm font-medium data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}>
//                         My Account
//                         {/*<ChevronDownIcon className="ml-2 h-4 w-4" />*/}
//                     </div>
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <div className="grid min-w-[12rem] p-2">
//                         <NavigationMenuLink asChild>
//                             <Link
//                                 href="/dashboard"
//                                 className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                                 prefetch={false}
//                             >
//                                 <div className="text-sm font-medium leading-none group-hover:underline">Dashboard</div>
//
//                             </Link>
//                         </NavigationMenuLink>
//
//                     </div>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
// </NavigationMenu>
            }
            <Link href={'/feedback'}>
                <Button className={`${pathname.includes('/feedback') ? 'bg-blue-600 text-white hover:bg-blue-500' : ''}  `}
                        variant="ghost">Feedback</Button>
            </Link>
            <Link href={'/terms-and-conditions'}>
                <Button className={`${pathname.includes('/terms-and-conditions') ? 'bg-blue-600 text-white hover:bg-blue-500' : ''}  `} variant="ghost">Privacy Policy
                    </Button>
            </Link>
        </nav>
    );
};

export default NavBar;
