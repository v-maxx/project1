import React, {useEffect, useState} from 'react';
import Tesseract from 'tesseract.js';
import {Box, Button, Modal, Typography} from '@mui/material';
import {useUploadThing} from "@/utills/uploadthing";
import {useAppDispatch} from "@/redux/hooks";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import {Input} from "@/components/ui/input";
import {Upload} from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

async function compress(file: File) {
    // Run some compression algorithm on the file
    return file;
}


const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const DocValidationComponent = ({docNum, docType, callback, currentUrl, callbackDelete, side}: any) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<any>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploadError, setUploadError] = useState<string|null>(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    useEffect(() => {
        if (currentUrl) {
            setUploadedImageUrl(currentUrl)
        }
    }, [currentUrl]);


    const {startUpload, isUploading,} = useUploadThing("imageUploader", {

        onClientUploadComplete: (res) => {

            console.log("Files: ", res);
            // dispatch(setApplicationState({frontPhoto: res[0]?.url}))
            setUploadLoading(false)
            setUploadedImageUrl(res[0]?.url)
            callback(res[0]?.url)
            setOpen(false)

        }, onUploadError: (error: Error) => {
            // Do something with the error.
            // alert(`ERROR! ${error.message}`);
            console.error(error.message)
            setUploadError('Error While uploading')
        }


    });
    // Handle modal open/close
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset form on close
        setImage(null);
        setExtractedText('');
        setIsValid(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);

        }
    };
    useEffect(() => {
        const uploadImageDOB = async () => {
            setUploadLoading(true)
            try {
                setUploadLoading(true)
                const compressed = await compress(image);
                await startUpload([compressed]);

                console.log('res', isUploading)

                // If you want to use the response later
                // const response = uploadFiles("imageUploader", {
                //     files: images,
                // });
                // console.log('image response--', response);
            } catch (error) {
                setUploadLoading(false)
                console.error('Error during upload:', error);
            } finally {
                setUploadLoading(false)
            }
        }


        if (image) {


            if (docType === 'Aadhar') {
                handleExtractText()
            } else {
                uploadImageDOB()
            }

        }


    }, [image]);

    const handleExtractText = () => {
        if (!image) return;
        setVerifyLoading(true)
        Tesseract.recognize(URL.createObjectURL(image), 'eng', {
            logger: (m) => console.log(m),
        }).then(({data: {text}}) => {
            setExtractedText(text);
            validateAadhaar(text);
        });
    };

    useEffect(() => {
        const uploadImage = async () => {
            setVerifyLoading(false)
            if (isValid) {
                setUploadLoading(true)


                try {
                    setUploadLoading(true)
                    const compressed = await compress(image);
                    await startUpload([compressed]);

                    console.log('res', isUploading)

                    // If you want to use the response later
                    // const response = uploadFiles("imageUploader", {
                    //     files: images,
                    // });
                    // console.log('image response--', response);
                } catch (error) {
                    setUploadLoading(false)
                    console.error('Error during upload:', error);
                } finally {
                    setUploadLoading(false)
                }
            }
        };

        uploadImage();
    }, [image, isValid, extractedText]);


    useEffect(() => {
        if (isUploading && uploadError) {
            setUploadError(null)
        }


    }, [isUploading, verifyLoading]);


    // Validate extracted text as Aadhaar card
    const validateAadhaar = (text: string) => {
        // Ensure docNum is a string of 12 digits
        if (!/^\d{12}$/.test(docNum)) {
            setIsValid(false);
            return;
        }
        console.log('text--' + text);

        console.log('docNum--' + docNum);

        // Format docNum to the pattern '#### #### ####'
        const formattedDocNum = docNum.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');

        // Clean the scanned text by removing non-digit characters
        const cleanedText = text.replace(/\D/g, ''); // Removes all non-digit characters

        console.log('cleaned--' + cleanedText);
        // Check if formattedDocNum is present in the cleaned text
        const formattedDocNumWithoutSpaces = formattedDocNum.replace(/\s+/g, ''); // Remove spaces from formattedDocNum
        const isPresent = cleanedText.includes(formattedDocNumWithoutSpaces);

        // Check for the presence of government-related keyword
        const govtRegex = /Government of India/i;
        const hasGovtKeyword = govtRegex.test(text);
        setVerifyLoading(false)
        if (side !== 'back') {
            setIsValid(isPresent && hasGovtKeyword)
        } else {
            setIsValid(isPresent)
        }
    };


    return (<div className={'w-full flex justify-center p-8'}>

        {!uploadedImageUrl && <div className={' flex items-center justify-center p-4 w-full'}>
            <Button variant="contained" disabled={docType === 'Aadhar' ? docNum.length < 12 : docNum.length < 6}
                    color="primary" className={'flex gap-4'}
                    onClick={handleOpen}>
                Upload

                <span> <Upload size={16}/></span>
            </Button>
        </div>}

        {uploadedImageUrl &&

            <div className={'w-full flex flex-col '}>
                <div className={'w-full justify-end flex'}>
                    <Button variant={'contained'} color={'error'} onClick={() => {
                        callbackDelete()
                        setUploadedImageUrl('')
                    }}>Remove</Button>
                </div>

                <Image height={100} width={100} src={uploadedImageUrl} alt={'uploaded image'}/>

            </div>

        }


        <Modal open={open} onClose={handleClose} aria-labelledby="aadhaar-modal-title">
            <Box sx={modalStyle}>
                <Typography textAlign={'center'} id="aadhaar-modal-title" variant="h6" component="h2">
                    {docType} Validation
                </Typography>
                <Typography textAlign={'center'} id="aadhaar-modal-title" variant="caption" component="h2">
                    Your {docType} Must be verified
                </Typography>


                {!isValid && (<div className={'py-8'}>
                    {/*<Label htmlFor="file-upload" className="block text-sm font-medium mb-1">*/}
                    {/*    Upload File*/}
                    {/*</Label>*/}
                    <Input
                        type="file" accept="image/*"
                        id="file-upload"
                        onChange={handleImageChange}

                        className="cursor-pointer"
                    />
                    <p className="text-sm text-center text-muted-foreground mt-1">
                        Accepted: Images only. Max size: 5MB
                    </p>
                </div>)}

                {isValid !== null && (<Box mt={2}>
                    {isValid ? (<Typography variant="body1" textAlign={'center'} color="green">
                        <CheckCircleOutlineIcon fontSize={'large'}/>
                        This is a valid Aadhaar card.
                    </Typography>) : (<Typography textAlign={'center'} variant="body1" color="red">
                        <NotInterestedIcon fontSize={'large'}/>
                        Invalid Aadhaar card.
                    </Typography>)}
                </Box>)}
                {verifyLoading && <div className={'flex justify-center py-8 '}>
                    <p>Verifying..</p>
                    <CircularProgress size={20}/>
                </div>}
                {isUploading && <div className={'flex justify-center py-8'}>
                    <p>uploading..</p>
                    <CircularProgress size={20}/>
                </div>}

                {uploadError && (<Box mt={2} sx={{
                    display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '4px'
                }}>
                    <Upload fontSize={12} color={'red'}/>
                    <Typography variant="body1" textAlign={'center'} color="red">

                        {uploadError}
                    </Typography>

                </Box>)}

                <div className={'flex justify-center'}>

                    <Button disabled={verifyLoading || uploadLoading} onClick={handleClose}
                            className={'align-middle justify-self-center'} color="secondary" variant="outlined"
                            style={{marginTop: '20px'}}>
                        Close
                    </Button>
                </div>

            </Box>
        </Modal>
    </div>);
};

export default DocValidationComponent
