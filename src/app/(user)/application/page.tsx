'use client'
import React, {useEffect, useState} from 'react';
import ApplicationFormComponent from "@/components/@core/application-form";
import FileUploader from "@/components/@core/file-uploader";

const Application = () => {

    return (
        <div className={'p-4'}>
            <ApplicationFormComponent/>

        </div>
    );
};

export default Application;
