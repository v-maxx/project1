'use client'
import React, {useEffect, useState} from 'react';
import ApplicationFormComponent from "@/components/@core/application-form";
import FileUploader from "@/components/@core/file-uploader";

const Application = () => {
    const [uploadedFile, setUploadedFile] = useState<any>([])

    useEffect(()=>{
        if (uploadedFile.length>0){
            console.log('uploadedFile',uploadedFile[0])

        }
    },[uploadedFile])

    return (
        <div className={'p-16'}>
            <ApplicationFormComponent/>
            <FileUploader setUploadFile={setUploadedFile}/>
        </div>
    );
};

export default Application;
