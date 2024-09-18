"use client";



import {UploadButton} from "@/utills/uploadthing";
import {useAppDispatch} from "@/redux/hooks";
import {setApplicationState} from "@/redux/features/user/userSlice";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function FileUploader({setUploadFile,callback,currentUrl,callbackDelete}:any) {
    const dispatch=useAppDispatch()
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')

    useEffect(() => {
        console.log('current url-',currentUrl)
        if (currentUrl){
            setUploadedImageUrl(currentUrl)
        }
    }, [currentUrl]);
    return (
        <main className="flex flex-col items-center justify-between p-4">
            { !uploadedImageUrl && <UploadButton
                endpoint="imageUploader"


                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    dispatch(setApplicationState({frontPhoto: res[0]?.url}))
                    // alert("Upload Completed");
                    // setUploadedImageUrl(res[0]?.url)
                    callback(res[0]?.url)
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />}

            {uploadedImageUrl &&

                <div className={'w-full flex flex-col '}>
                    <div className={'w-full justify-end flex'}>
                        <Button variant={'destructive'} onClick={()=> {
                            callbackDelete()
                            setUploadedImageUrl('')
                        }} >Remove</Button>
                    </div>

                    <Image height={100} width={100} src={uploadedImageUrl} alt={'uploaded image'}/>

                </div>

            }



        </main>
    );
}
