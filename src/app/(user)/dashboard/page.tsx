'use client'
import React, {useContext, useEffect} from 'react';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import {fetchLinks} from "@/lib/helpers/functions";
import {useAuth} from "@/redux/store";
import ApplicationsTable from "@/components/application-table";
import {TableCaption} from "@/components/ui/table";
import Fab from "@/components/@core/fab";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";

const Dashboard = () => {

    const {user,refetchUserData}=useAuth()
const router=useRouter()


    const fetchAllApplications = async () => {
        try {
            const response = await fetch('/api/applications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const data = await response.json();
            return data.applications;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    };



    useEffect(() => {
        (async () => {
            await fetchAllApplications()
        })()
    }, []);


    return (<div className="flex w-full flex-col container mx-auto">
        {/*<Fab/>*/}
            <main className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/*<TaskCount/>*/}
                    {/*<Card>*/}
                    {/*    <CardHeader className="flex flex-row items-center justify-between pb-2">*/}
                    {/*        <CardTitle className="text-sm font-medium">Conversion Time</CardTitle>*/}
                    {/*        <BarChartIcon className="w-4 h-4 text-muted-foreground"/>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <div className="text-2xl font-bold">2hrs</div>*/}
                    {/*        /!*<p className="text-xs text-muted-foreground">+2% from last month</p>*!/*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
                    <div className={'flex w-full justify-end'}>
                        <Button
                            type="button"
                            variant="default"
                            size="sm"
                            className="px-3 py-2 max-w-min"
                            onClick={()=>router.replace("/application")}
                            // aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            New Application
                        </Button>
                    </div>

                    <Card >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xl font-medium">Recent Applications</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <ApplicationsTable/>

                        </CardContent>
                    </Card>





                </div>
            </main>
        </div>)
}

function BarChartIcon(props:any) {
    return (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="20" y2="10"/>
            <line x1="18" x2="18" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>)
}


function DollarSignIcon(props:any) {
    return (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>)
}


function UsersIcon(props:any) {
    return (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>)
}


function XIcon(props:any) {
    return (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>)


}

export default Dashboard;
