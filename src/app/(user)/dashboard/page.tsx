'use client'
import React, {useContext, useEffect, useState} from 'react';

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

import {fetchLinks} from "@/lib/helpers/functions";
import {useAuth} from "@/redux/store";
import ApplicationsTable from "@/components/application-table";
import {TableCaption} from "@/components/ui/table";
import Fab from "@/components/@core/fab";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setApplications} from "@/redux/features/user/userSlice";
import Spinner from "@/molecules/spinner";
import useSWR from "swr";
import {ProgressIndicator} from "@radix-ui/react-progress";
import CircularProgress from "@mui/material/CircularProgress";


const Dashboard = () => {
    const dispatch = useAppDispatch()
    const applications = useAppSelector((state: any) => state.user.applications)
    const {user, refetchUserData} = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const fetcher = (url: string) => fetch(url).then(r => r.json())

    const {data, error, isLoading, mutate} = useSWR('/api/applications', fetcher);


    // const fetchAllApplications = async () => {
    //     try {
    //         setLoading(true)
    //         const response = await fetch('/api/applications', {
    //             method: 'GET', headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (!response.ok) {
    //
    //             throw new Error('Failed to fetch applications');
    //         }
    //
    //         const data = await response.json();
    //         return data.applications;
    //     } catch (error) {
    //         setLoading(false)
    //         console.error('Error fetching applications:', error);
    //         throw error;
    //     } finally {
    //         setLoading(false)
    //     }
    // };


    useEffect(() => {
        console.log('applications in seelcto', applications)
    }, [applications]);


    useEffect(() => {
        if (data) {
            dispatch(setApplications((data as any).applications))
        }


    }, [data]);


    return (<div className="flex w-full flex-col container mx-auto">
        <main className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
                <div className={'flex w-full justify-end'}>
                    <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="px-3 py-2 max-w-min"
                        onClick={() => router.replace("/application")}
                    >
                        New Application
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-medium">Recent Applications</CardTitle>

                    </CardHeader>
                    <CardContent>
                        {isLoading ? <CircularProgress/> :

                            <ApplicationsTable applicationsData={applications} refetchApplications={mutate}/>}
                    </CardContent>
                </Card>


            </div>
        </main>
    </div>)
}

function UsersIcon(props: any) {
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


function XIcon(props: any) {
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
