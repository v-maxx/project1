'use client'
import React from 'react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/redux/store";
import {User2Icon} from "lucide-react";


const IsLoggedIn = () => {
    const session = useSession()
    const router = useRouter()
    const {user} = useAuth()

    return (<div>
            {session?.data ? <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User2Icon/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{session?.data?.user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {/*<Link href={'/dashboard'}>*/}
                        {/*    <DropdownMenuItem >Dashboard</DropdownMenuItem>*/}

                        {/*</Link>*/}

                        {/*<DropdownMenuSeparator/>*/}

                        {/*<Link href={'/referral'}>*/}
                        {/*    <DropdownMenuItem>Referral</DropdownMenuItem>*/}

                        {/*</Link>*/}


                        {/*<DropdownMenuSeparator/>*/}
                        {/*<DropdownMenuSeparator/>*/}
                        {/*<DropdownMenuItem onClick={async ()=> {*/}
                        {/*    await router.push('/account')*/}
                        {/*}}>Profile</DropdownMenuItem>*/}
                        {/*<DropdownMenuSeparator/>*/}
                        {/*<DropdownMenuItem onClick={async ()=> {*/}
                        {/*    await router.push('/withdraw')*/}
                        {/*}}>Withdraw</DropdownMenuItem>*/}
                        {/*<DropdownMenuSeparator/>*/}
                        <DropdownMenuItem onClick={async () => await signOut()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> :

                ( <Link href={'/login'}>
                    <button
                        type="button"
                        className="text-white bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Login
                    </button>
                </Link>)}
        </div>);
};

export default IsLoggedIn;
