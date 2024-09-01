'use client'
import React, {useEffect, useState} from 'react';
import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import OtpLogin from "@/components/@core/OtpLogin";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {selectApplicationState, selectCount, setApplicationState} from "@/redux/features/user/userSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import FileUploader from "@/components/@core/file-uploader";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

// Components

// Define the form data interface
interface FormData {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    verification: boolean;
    address: string;
    address1: string;
    residenceType: string;
    occupation: string;
    category: string;
    email: string;
    frontPhoto: File | null;
    backPhoto: File | null;
    photo: File | null;

}

// Initial form values
const initialValues: FormData = {
    name: '',
    fatherName: '',
    documentType: '',
    documentNumber: '',
    mobile: '+91',
    verification: false,
    address: '',
    address1: '',
    residenceType: 'Permanent',
    occupation: '',
    category: '',
    email: '',
    frontPhoto: null,
    backPhoto: null,
    photo: null,
};

// Define validation schemas for each step
const validationSchemas = [
    Yup.object({
        name: Yup.string().required('Name is required'),
        fatherName: Yup.string().required('Father\'s Name is required'),
        documentType: Yup.string().required('Document Type is required'),
        documentNumber: Yup.string().required('Document Number is required'),

        frontPhoto: Yup.mixed().nullable().required('Front Photo is required'),
        backPhoto: Yup.mixed().nullable().optional(),
    }),
    Yup.object({
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^\+91[1-9]\d{9}$/, 'Mobile must start with +91 and followed by a valid Contact number'),

        verification: Yup.boolean()
            .required('Not Verified, Please verify your contact number first')
            .oneOf([true], 'Contact number must be verified'),
    }),
    Yup.object({
        address: Yup.string().required('Address is required'),
        address1: Yup.string().when('residenceType', {
            is: 'temporary',  // correctly checking if the value is 'temporary'
            then: (schema) => schema.required('Address1 is required'),  // make it required if condition is true
            otherwise: (schema) =>schema.optional(),  // optional if condition is false
        }),
        residenceType: Yup.string().required('Residence Type is required'),
        occupation: Yup.string().required('Occupation is required'),
        category: Yup.string().required('Category is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format'),
    }),
    Yup.object({
        photo: Yup.mixed().nullable().required('Please Upload Photo'),
    }),
];

const ApplicationFormComponent: React.FC = () => {

    const [uploadedFrontFile, setUploadedFrontFile] = useState<any>(undefined)
    const [uploadedBackFile, setUploadedBackFile] = useState<any>(undefined)
    const [uploadedPhotoFile, setUploadedPhotoFile] = useState<any>(undefined)
const router=useRouter()
    // useEffect(()=>{
    //     if (uploadedFile.length>0){
    //         console.log('uploadedFile',uploadedFile[0])
    //     }
    // },[uploadedFile])

const submitApplication=async (formData:any)=>{
    try {
        const response = await fetch('/api/create-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers if needed
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // alert('Application created successfully');
            console.log('Result:', result);
            toast.success('Password changed successfully.');
            router.replace('/dashboard')
            // Handle successful result
        } else {
            // alert('Failed to create application');
            console.error('Error:', result.error);
            toast.error(result.details);
            // Handle error result
        }
    } catch (error:any) {
        // alert('An unexpected error occurred');
        console.error('Error:', error);
        toast.error(error.message);
    }
}
    const [step, setStep] = React.useState<number>(1);
const dispatch=useAppDispatch()
    const application=useAppSelector((state:any) => state.applicationState)
    useEffect(() => {
        console.log('application stateeee--',application)

    }, [application,step]);


    const formik = useFormik<FormData>({
        initialValues,
        validationSchema: validationSchemas[step - 1], // Apply the correct validation schema for the current step
        onSubmit: async (values) => {
           await submitApplication(values)
        },
    });

    const handleNext = async () => {
        const errors: FormikErrors<FormData> = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setStep((prev) => Math.min(prev + 1, 4));
            console.log('setting state-',formik.values)
            dispatch(setApplicationState(formik.values))
            // Total steps including OTP step
        } else {
            await formik.setTouched({
                ...formik.touched,
                ...Object.keys(errors).reduce((acc, key) => {
                    acc[key as keyof FormData] = true;
                    return acc;
                }, {} as any),
            });
        }



    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };


    useEffect(() => {
        console.log('applicationStaet-',selectApplicationState)
        console.log('applicationStaet-',selectCount)
        console.log('formik values-',formik.values)
        console.log('formik errors-',formik.errors)


    }, [step,formik.values]);
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 formik={formik} />;
            case 2:
                return <Step2 formik={formik} />;
            case 3:
                return <Step3 formik={formik} />;
            case 4:
                return <Step4 formik={formik} />;
            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader >
                <CardTitle>Application - Step {step}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-16 bg-secondary h-2 rounded-full">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>
                {renderStep()}
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 1 && (
                    <Button onClick={handlePrev} variant="outline">
                        Previous
                    </Button>
                )}
                {step < 4 ? (
                    <Button onClick={handleNext} className="ml-auto">
                        Next
                    </Button>
                ) : (
                    <Button onClick={formik.submitForm} className="ml-auto">
                        Submit
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

// Step components

const Step1: React.FC<{ formik: any }> = ({ formik,setUploadedFrontFile,
                                              setUploadedBackFile }:any) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name">Name of Applicant</Label>
            <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
            ) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="fatherName">Father's Name</Label>
            <Input
                id="fatherName"
                name="fatherName"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.fatherName && formik.errors.fatherName ? (
                <div className="text-red-500 text-xs">{formik.errors.fatherName}</div>
            ) : null}
        </div>

        <div className="space-y-2">
            <Label htmlFor="documentType">Select Document Type</Label>
            <Select
                value={formik.values.documentType}
                onValueChange={(value) => formik.setFieldValue('documentType', value)}
            >
                <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select Document" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                    <SelectItem value="dob">DOB Certificate</SelectItem>
                </SelectContent>
            </Select>
            {formik.touched.documentType && formik.errors.documentType ? (
                <div className="text-red-500 text-xs">{formik.errors.documentType}</div>
            ) : null}
        </div>

        {formik.values.documentType && (
            <>
        <div className="space-y-2">
                    <Label htmlFor="documentNumber">
                        {formik.values.documentType === 'aadhar' ? 'Aadhar Number' : 'DOB Certificate Number'}
                    </Label>
            <Input
                id="documentNumber"
                name="documentNumber"
                value={formik.values.documentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.documentNumber && formik.errors.documentNumber ? (
                <div className="text-red-500 text-xs">{formik.errors.documentNumber}</div>
            ) : null}
        </div>
        <div className="space-y-2">
                    <Label htmlFor="frontPhoto">Upload Front Photo</Label>
            {/*<Input*/}
            {/*    id="frontPhoto"*/}
            {/*    name="frontPhoto"*/}
            {/*            type="file"*/}
            {/*            accept="image/*"*/}
            {/*            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {*/}
            {/*                if (e.target.files) {*/}
            {/*                    formik.setFieldValue('frontPhoto', e.target.files[0]);*/}
            {/*                }*/}
            {/*    }}*/}
            {/*/>*/}
            <FileUploader setUploadFile={setUploadedFrontFile} currentUrl={formik.values.frontPhoto} callbackDelete={()=>formik.setFieldValue('frontPhoto','')} callback={(value:string)=>formik.setFieldValue('frontPhoto',value)}/>
            {formik.touched.frontPhoto && formik.errors.frontPhoto ? (
                <div className="text-red-500 text-xs">{formik.errors.frontPhoto}</div>
            ) : null}
        </div>
        <div className="space-y-2">
                    <Label htmlFor="backPhoto">Upload Back Photo (Optional)</Label>
            {/*<Input*/}
            {/*    id="backPhoto"*/}
            {/*    name="backPhoto"*/}
            {/*            type="file"*/}
            {/*            accept="image/*"*/}
            {/*            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {*/}
            {/*                if (e.target.files) {*/}
            {/*                    formik.setFieldValue('backPhoto', e.target.files[0]);*/}
            {/*                }*/}
            {/*    }}*/}
            {/*        />*/}
            <FileUploader setUploadFile={setUploadedBackFile} currentUrl={formik.values.backPhoto} callbackDelete={()=>formik.setFieldValue('backPhoto','')}  callback={(value:string)=>formik.setFieldValue('backPhoto',value)}/>
            {formik.touched.backPhoto && formik.errors.backPhoto ? (
                <div className="text-red-500 text-xs">{formik.errors.backPhoto}</div>
            ) : null}

        </div>
            </>
        )}
    </div>
);

const Step2: React.FC<{ formik: any; }> = ({ formik }) => (
    <div className="space-y-4">
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl text-center mb-5">
                Mobile Verification
            </h1>
            <OtpLogin formik={formik}/>
        </div>
        {/*<div className="space-y-2">*/}
        {/*    <Label htmlFor="mobile">Mobile</Label>*/}
        {/*    <Input*/}
        {/*        id="mobile"*/}
        {/*        name="mobile"*/}
        {/*        type="tel"*/}
        {/*        value={formik.values.mobile}*/}
        {/*        onChange={formik.handleChange}*/}
        {/*        onBlur={formik.handleBlur}*/}
        {/*    />*/}

            { formik.errors.verification ? (
                <div className="text-red-500 text-xs">{formik.errors.verification}</div>
            ) : null}
        {/*</div>*/}
    </div>
);

const Step3: React.FC<{ formik: any }> = ({ formik }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="verification">Verification Status:<span className={'text-green-600'}>{formik.values.verification && 'Verified'}</span></Label>
        </div>
        <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-xs">{formik.errors.address}</div>
            ) : null}
        </div>
        <div className="space-y-2">
            <Label>Select Residence Type</Label>
            <RadioGroup
                value={formik.values.residenceType}
                onValueChange={(value) => formik.setFieldValue('residenceType', value)}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Permanent" id="permanent" />
                    <Label htmlFor="permanent">Permanent</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Temporary" id="temporary" />
                    <Label htmlFor="Temporary">Temporary</Label>
                </div>

            </RadioGroup>
            {formik.touched.residenceType && formik.errors.residenceType ? (
                <div className="text-red-500 text-xs">{formik.errors.residenceType}</div>
            ) : null}

        </div>

        {formik.values.residenceType==='Temporary' && <div className="space-y-2">
            <Label htmlFor="address1">Permanent Address</Label>
            <Input
                id="address1"
                name="address1"
                value={formik.values.address1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.address1 && formik.errors.address1 ? (
                <div className="text-red-500 text-xs">{formik.errors.address1}</div>
            ) : null}
        </div>}


        <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
                id="occupation"
                name="occupation"
                value={formik.values.occupation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.occupation && formik.errors.occupation ? (
                <div className="text-red-500 text-xs">{formik.errors.occupation}</div>
            ) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
                value={formik.values.category}
                onValueChange={(value) => formik.setFieldValue('category', value)}
            >
                <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="GEN">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="STSC">ST/SC</SelectItem>
                </SelectContent>
            </Select>
            {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500 text-xs">{formik.errors.category}</div>
            ) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
        </div>
    </div>
);

const Step4: React.FC<{ formik: any }> = ({ formik ,
                                              setUploadedPhotoFile}:any) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo</Label>
            {/*<Input*/}
            {/*    type="file"*/}
            {/*    id="photo"*/}
            {/*    name="photo"*/}
            {/*    onChange={(event:any) => {*/}
            {/*        formik.setFieldValue("photo", event.currentTarget.files[0]);*/}
            {/*    }}*/}
            {/*    onBlur={formik.handleBlur}*/}
            {/*/>*/}
            <FileUploader setUploadFile={setUploadedPhotoFile} currentUrl={formik.values.photo} callbackDelete={()=>formik.setFieldValue('photo','')}  callback={(value:string)=>formik.setFieldValue('photo',value)}/>

            {formik.touched.photo && formik.errors.photo ? (
                <div className="text-red-500 text-xs">{formik.errors.photo}</div>
            ) : null}
        </div>
    </div>
);

export default ApplicationFormComponent;
