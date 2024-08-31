'use client'
import React, {useContext, useEffect} from 'react';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {getServerSession} from "next-auth";
import {useAuth} from "@/store/store";
import {DataContext} from "@/context/DataContext";
import TaskCount from "@/molecules/task-count";
import ProfitCount from "@/molecules/profit-count";
import WithdrawTable from "@/components/withdraw-table";
import {Typography} from "@mui/material";
import TaskMainSection from "@/components/TaskMainSection";
import {fetchLinks} from "@/lib/helpers/functions";

const Dashboard = () => {

    const {user,refetchUserData}=useAuth()

    const {links, setLinksData, loading, setLoading} = useContext(DataContext);



    // useEffect(() => {
        // (async () => {
        //     await refetchUserData()
        // })()
    // }, []);


    return (<div className="flex min-h-screen w-full flex-col bg-muted/40">
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
                    {/*<Card className={'bg-yellow-300'}>*/}
                    {/*    <CardHeader className="flex flex-row items-center justify-between pb-2">*/}
                    {/*        <CardTitle className="text-sm font-medium">NOTE:</CardTitle>*/}
                    {/*        /!*<Link href="#" className="text-sm font-medium text-primary" prefetch={false}>*!/*/}
                    {/*        /!*    View All*!/*/}
                    {/*        /!*</Link>*!/*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <Table>*/}
                    {/*        <TableBody>*/}
                    {/*                <TableRow>*/}
                    {/*                   <Typography>Minimum withdrawal limit is ₹250</Typography>*/}
                    {/*                </TableRow>*/}

                    {/*                <TableRow>*/}
                    {/*                    <Typography>After Requesting for Withdrawal, wait for at least 2hrs.</Typography>*/}
                    {/*                </TableRow>*/}
                    {/*                /!*<TableRow>*!/*/}
                    {/*                /!*    <Typography>After Requesting for Withdrawal, wait for at least 2hrs.</Typography>*!/*/}
                    {/*                /!*</TableRow>*!/*/}

                    {/*            </TableBody>*/}
                    {/*        </Table>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}


                    <TaskMainSection/>

                    <Card>
                        <WithdrawTable/>
                        {/*<CardHeader className="flex flex-row items-center justify-between pb-2">*/}
                        {/*    <CardTitle className="text-sm font-medium">Current Tasks</CardTitle>*/}
                        {/*    <Link href="#" className="text-sm font-medium text-primary" prefetch={false}>*/}
                        {/*        View All*/}
                        {/*    </Link>*/}
                        {/*</CardHeader>*/}
                        {/*<CardContent>*/}
                        {/*    <div className="grid gap-4">*/}
                        {/*        <div className="flex items-center justify-between">*/}
                        {/*            <div>*/}
                        {/*                <div className="font-medium">Finalize Q2 report</div>*/}
                        {/*                <div className="text-xs text-muted-foreground">Due: 2023-06-30</div>*/}
                        {/*            </div>*/}
                        {/*            <Progress value={75} aria-label="75% complete"/>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex items-center justify-between">*/}
                        {/*            <div>*/}
                        {/*                <div className="font-medium">Prepare for client meeting</div>*/}
                        {/*                <div className="text-xs text-muted-foreground">Due: 2023-05-15</div>*/}
                        {/*            </div>*/}
                        {/*            <Progress value={50} aria-label="50% complete"/>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex items-center justify-between">*/}
                        {/*            <div>*/}
                        {/*                <div className="font-medium">Implement new feature</div>*/}
                        {/*                <div className="text-xs text-muted-foreground">Due: 2023-07-01</div>*/}
                        {/*            </div>*/}
                        {/*            <Progress value={25} aria-label="25% complete"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</CardContent>*/}
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
