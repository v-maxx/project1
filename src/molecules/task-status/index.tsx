'use client'
import React, {useContext, useEffect, useState} from 'react';

const TaskStatus = ({id,setTaskAvailable}:any) => {
    const [isCompleted, setIsCompleted] = useState(false)
    // const {links, setLinksData, loading, setLoading} = useContext(DataContext);

    // if(loading) return  <Spinner/>
    useEffect(() => {
       ( async ()=>{
          const res= await fetch(`/api/links/status/${id}`, {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },

           });

          if (!res.ok) return

           const data=await res.json()

           setIsCompleted(data?.status)
           setTaskAvailable(!data?.status)
       })()
    }, []);





    return (
        <div className={'bg-yellow-600 rounded-xl'}>
            <div className={`flex flex-row items-center justify-between bg-${isCompleted ? 'green' :'yellow'}-400 rounded-xl px-6 py-2`}>
                {isCompleted ? 'COMPLETED' :'PENDING'}
            {/*    <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>*/}
            {/*    <UsersIcon className="w-4 h-4 text-muted-foreground"/>*/}
            </div>
            {/*<CardContent>*/}
            {/*    PEnding..*/}
                {/*<div className="text-2xl font-bold">{links?.length ?? 0}</div>*/}
                {/*<p className="text-xs text-muted-foreground">+180.1% from last month</p>*/}
            {/*</CardContent>*/}
        </div>
    );
};

export default TaskStatus;
