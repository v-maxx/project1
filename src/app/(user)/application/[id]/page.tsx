'use client'
import React, {useEffect, useState} from 'react';
import ApplicationFormComponent from "@/components/@core/application-form";
import FileUploader from "@/components/@core/file-uploader";

const ApplicationSingle = ({ params }: { params: { slug: string } }) => {

    useEffect(() => {

    }, []);

    return (
        <div className={'p-16'}>
            <ApplicationFormComponent/>

        </div>
    );
};

export default ApplicationSingle;
