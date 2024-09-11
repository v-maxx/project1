'use client'
import React, {useEffect, useState} from 'react';
import ApplicationFormComponent from "@/components/@core/application-form";
import FileUploader from "@/components/@core/file-uploader";

const ApplicationSingle = ({ params }: { params: { id: string } }) => {
    const [applicationData, setApplicationData] = useState<any>(undefined)
    const fetchApplicationById = async (applicationId: string) => {
        try {
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch application details');
            }

            const data = await response.json();
            return data.application;
        } catch (error) {
            console.error('Error fetching application details:', error);
            throw error;
        }
    };

    useEffect(() => {
       ( async ()=> {
           const data = await fetchApplicationById(params.id)
           console.log('found single data',data)
           setApplicationData(data)
       })()

    }, []);

    return (
        <div className={'p-4'}>
            <ApplicationFormComponent applicationData={applicationData} applicationId={params.id} type={'update'}/>

        </div>
    );
};

export default ApplicationSingle;
