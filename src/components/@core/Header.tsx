'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {MenuIcon, PlayCircle} from "lucide-react";
import NavBar from "@/molecules/navbar";
import IsLoggedIn from "@/molecules/isLoggedIn";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Image from "next/image";
import {usePathname} from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const session=useSession()
    const pathname=usePathname()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
setIsOpen(false)

    }, [pathname]);

    // <header className=" container flex items-center justify-between content-center p-4 bg-white border-b">
    //     <div className="text-2xl font-bold text-blue-500">
    //         <a href="/" className="flex ms-2 md:me-24">
    //             {/*<img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3"*/}
    //             {/*     alt="FlowBite Logo"/>*/}
    //             <span
    //                 className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">ViewMaxx</span>
    //         </a>
    //     </div>
    //     <div className={'flex'}>
    //
    //         <NavBar/>
    //         <IsLoggedIn/>
    //         <Sheet>
    //             <SheetTrigger asChild>
    //                 <Button variant="outline" size="icon" className="md:hidden">
    //                     <MenuIcon className="h-6 w-6" />
    //                     <span className="sr-only">Toggle menu</span>
    //                 </Button>
    //             </SheetTrigger>
    //             <SheetContent side="right">
    //                 <nav className="flex flex-col space-y-4">
    //                     <Button variant="ghost">Home</Button>
    //                     <Link href={'/account'}>
    //                         <Button variant="ghost">My Account</Button>
    //                     </Link>                            <Button variant="ghost">About Us</Button>
    //                 </nav>
    //             </SheetContent>
    //         </Sheet>
    //     </div>
    // </header>



    return (
        <nav className="   bg-gray-100 from-[#57b9e3] to-[#b4cfb4] backdrop-blur-md dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b  dark:border-gray-600">
            <div className="container mx-auto flex  items-center justify-between py-4">
                <Link className="flex items-center justify-center" href="/">
                    {/*<Image src={'/v_logo.png'} width={70} height={20} alt={'logo'}/>*/}
                    <span className="ml-2 text-2xl font-extrabold text-blue-700">Sukanya Card</span>
                </Link>
                <div className=" flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className={'flex'}>
                                <NavBar/>
                                <IsLoggedIn/>
                                <Sheet open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
                                    <SheetTrigger asChild>
                                        <Button onClick={toggleMenu} variant="outline" size="icon" className="md:hidden">
                                            <MenuIcon className="h-6 w-6" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className={'bg-gradient-to-bl from-[#57b9e3] to-[#b4cfb4]'}>

                                        <nav className="md:hidden grid grid-cols-1 mt-8 space-y-2">
                                            <Link  href={'/'}>
                                                <Button className={`${pathname===('/') ? 'bg-blue-800 text-white' :''} w-full`} >Home</Button>
                                            </Link>
                                            {session.data &&

                                                    <Link
                                                        href="/dashboard"
                                                        className="group grid h-auto w-full items-center"
                                                        prefetch={false}
                                                    >
                                                        <Button className={`${pathname===('/dashboard') ? 'bg-blue-800 text-white' :''} w-full`} >Dashboard</Button>
                                                    </Link>

                                            }

                                            <Link  href={'/feedback'}>
                                                <Button className={`${pathname.includes('/feedback') ? 'bg-blue-800 text-white' :''} w-full`} >Feedback</Button>
                                            </Link>
                                            <Link  href={'/terms-and-conditions'}>
                                                <Button className={`${pathname.includes('/terms-and-conditions') ? 'bg-blue-800 text-white' :''} w-full`} >Privacy Policy</Button>
                                            </Link>
                                        </nav>

                                        <Link className="flex flex-col items-center justify-center py-3 mt-8 font-extrabold text-xl  rounded-lg" href="/">
                                          Sukanya Card

                                        </Link>

                                    </SheetContent>
                                </Sheet>
                            </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
