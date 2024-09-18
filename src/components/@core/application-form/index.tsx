'use client'
import React, {useEffect, useState} from 'react';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import * as Yup from 'yup';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {setApplicationState} from "@/redux/features/user/userSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import FileUploader from "@/components/@core/file-uploader";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TwilioOtp from "@/components/@core/TwilioOtp";
import DocValidationComponent from "@/components/@core/DocValidationComponent";
import AadharInput from "@/components/@core/AadharPartedInput";
// Components

// Define the form data interface
interface FormData {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    verification: boolean;
    address: {
        street: string; district: string; city: string; state: string; pincode: string;
    },
    address1: {
        street: string; district: string; city: string; state: string; pincode: string;
    } | null;
    residenceType: string;
    occupation: string;
    category: string;
    email: string;
    frontPhoto: File | null;
    backPhoto: File | null;
    photo: File | null;
    status: string;
    dob: string;
    age: string;

}

// Initial form values
const initialValues: FormData = {
    name: '',
    fatherName: '',
    documentType: '',
    documentNumber: '',
    mobile: '',
    verification: false,
    address: {
        street: "", district: "", city: "", state: "", pincode: "",
    },
    address1: {
        street: "", district: "", city: "", state: "", pincode: "",
    },
    residenceType: 'Permanent',
    occupation: '',
    category: '',
    email: '',
    frontPhoto: null,
    backPhoto: null,
    photo: null,
    status: 'Pending',
    dob: '',
    age: ''
};

// Define validation schemas for each step
const validationSchemas = [Yup.object({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Name must not contain numbers or special characters'),

    fatherName: Yup.string()
        .required("Father's Name is required")
        .matches(/^[A-Za-z\s]+$/, "Father's Name must not contain numbers or special characters"),

    dob: Yup.date().required('Date of Birth is required'),
    age: Yup.string().required('Age is required'),
    documentType: Yup.string().required('Document Type is required'), // documentNumber: Yup.string().required('Document Number is required'),
    documentNumber: Yup.string()
        .when('documentType', {
            is: 'aadhar', // If documentType is 'aadhar'
            then: (schema) => schema.length(12, 'Enter Correct Aadhar Number').matches(/^[1-9][0-9]*$/, 'Enter a Valid Aadhar Number')// Ensuring length is 16
                .required('Please enter Aadhar number'), // Required validation for aadhar
            otherwise: (schema) => schema.required('Document Number is required'), // Default required validation
        }),
    frontPhoto: Yup.mixed().nullable().required('Front Photo is required'), // backPhoto: Yup.mixed().nullable().required('Back Photo is required'),
    backPhoto: Yup.mixed().nullable()
        .when('documentType', {
            is: 'dob', // If documentType is 'aadhar'
            then: (schema) => schema.optional(), // Ensuring length is 16
            otherwise: (schema) => schema.required('Please Upload Back Photo'), // Default required validation
        }),
}), Yup.object({
    mobile: Yup.string()
        .matches(/^[1-9][0-9]{9}$/, 'Enter Valid Mobile Number').length(10, 'Enter Valid Mobile Number').required('Mobile is required'),

    verification: Yup.boolean()
        .required('Not Verified, Please verify your contact number first')
        .oneOf([true], 'Contact number must be verified'),
}), Yup.object({
    // Address validation as object
    address: Yup.object().shape({
        street: Yup.string().required('Street is required'),
        district: Yup.string().required('District is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
    }).required('Address is required'),

    address1: Yup.object()
        .nullable()  // address1 can be null if not required
        .when('residenceType', {
            is: 'Temporary', then: (schema) => schema.shape({
                street: Yup.string().required('Street is required'),
                district: Yup.string().required('District is required'),
                city: Yup.string().required('City is required'),
                state: Yup.string().required('State is required'),
                pincode: Yup.string()
                    .required('Pincode is required')
                    .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
            }), otherwise: (schema) => schema.shape({
                street: Yup.string().optional(),
                district: Yup.string().optional(),
                city: Yup.string().optional(),
                state: Yup.string().optional(),
                pincode: Yup.string()
                    .optional()
                    .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
            }),  // address1 is optional otherwise
        }),
    residenceType: Yup.string().required('Residence Type is required'),
    occupation: Yup.string().required('Occupation is required'),
    category: Yup.string().required('Category is required'),
    email: Yup.string()
        .optional()
        .email('Invalid email format'),
}), Yup.object({
    photo: Yup.mixed().nullable().required('Please Upload Photo'),
}),];

interface ApplicationFormProps {
    applicationData?: any; // Replace 'any' with the correct type
    applicationId?: string;
    type?: string;
}

const ApplicationFormComponent: React.FC<ApplicationFormProps> = ({applicationData, applicationId, type}) => {

    const [uploadedFrontFile, setUploadedFrontFile] = useState<any>(undefined)
    const [uploadedBackFile, setUploadedBackFile] = useState<any>(undefined)
    const [uploadedPhotoFile, setUploadedPhotoFile] = useState<any>(undefined)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submitApplication = async (formData: any) => {
        try {
            setLoading(true)
            const response = await fetch('/api/create-application', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', // Include any other headers if needed
                }, body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // alert('Application created successfully');
                console.log('Result:', result);
                toast.success('Application created  successfully.');
                router.replace('/dashboard')
                // Handle successful result
            } else {
                // alert('Failed to create application');
                console.error('Error:', result.error);
                toast.error(result.details);
                // Handle error result
            }
        } catch (error: any) {
            // alert('An unexpected error occurred');
            console.error('Error:', error);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    const updateApplication = async (formData: any) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: 'PATCH', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(formData),
            });

            // if (!response.ok) {
            //     throw new Error('Failed to update application');
            // }
            const data = await response.json();
            if (response.ok) {
                // return data.application;
                // alert('Application created successfully');
                // console.log('Result:', result);
                toast.success('Application Updated successfully.');
                router.replace('/dashboard')
                // Handle successful result
            } else {
                // alert('Failed to create application');
                toast.error(data.details);
                // Handle error result
            }


        } catch (error) {
            console.error('Error updating application:', error);
            throw error;
        } finally {
            setLoading(false)
        }

    }

    const [step, setStep] = React.useState<number>(1);
    const dispatch = useAppDispatch()
    const application = useAppSelector((state: any) => state.user.applicationState)
    // useEffect(() => {
    //     console.log('application stateeee--', application)
    //
    // }, [application, step]);


    const formik = useFormik<FormData>({
        initialValues, validationSchema: validationSchemas[step - 1], // Apply the correct validation schema for the current step
        onSubmit: async (values) => {

            if (type === 'update') {

                await updateApplication(values)
            } else {
                await submitApplication(values)
            }
        },
    });

    const [dobValue, setDobValue] = useState('')
    useEffect(() => {
        console.log('applicationData stateeee--', applicationData)
        if (applicationData) {
            console.log('applicationData stateeee--', applicationData)
            formik.setValues(applicationData)
            // setDobValue(applicationData.dob)
        }
    }, [applicationData])

    const handleNext = async () => {
        const errors: FormikErrors<FormData> = await formik.validateForm();

        // Check if there are any errors
        if (Object.keys(errors).length === 0) {
            setStep((prev) => Math.min(prev + 1, 4)); // Move to next step
            console.log('setting state-', formik.values);
            dispatch(setApplicationState(formik.values)); // Store current form state in the redux store
        } else {
            // Manually set touched fields for nested objects like address and address1
            const touchedFields: FormikTouched<FormData> = {
                ...formik.touched, ...Object.keys(errors).reduce((acc: any, key) => {
                    // Check if the field is a nested object like address or address1
                    if (typeof errors[key as keyof FormData] === 'object') {
                        acc[key as keyof FormData] = formik.values[key as keyof FormData];
                    } else {
                        acc[key as keyof FormData] = true; // Set non-nested fields as touched
                    }
                    return acc;
                }, {} as FormikTouched<FormData>),
            };

            // Set touched fields to formik, including nested ones
            await formik.setTouched(touchedFields);
        }
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };


    useEffect(() => {
        console.log('formik values-', formik.values)
        console.log('formik errors-', formik.errors)


    }, [step, formik.values]);
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 formik={formik}/>;
            case 2:
                return <Step2 formik={formik}/>;
            case 3:
                return <Step3 formik={formik}/>;
            case 4:
                return <Step4 formik={formik}/>;
            default:
                return null;
        }
    };

    return (<Card className="w-full max-w-3xl mx-auto">
        <CardHeader>{type === 'update' ? <CardTitle>
            <div className={'flex justify-between items-center'}>
                Application
                <Button variant={'secondary'}> {formik.values.status}</Button>
            </div>
        </CardTitle> : <CardTitle>Application - Step {step}</CardTitle>}
        </CardHeader>
        <CardContent>
            <div className="mb-16 bg-secondary h-2 rounded-full">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{width: `${(step / 4) * 100}%`}}
                ></div>
            </div>
            {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
            {step > 1 && (<Button onClick={handlePrev} variant="outline">
                Previous
            </Button>)}
            {step < 4 ? (<Button onClick={handleNext} className="ml-auto">
                Next
            </Button>) : (<Button disabled={loading} onClick={formik.submitForm} className="ml-auto">
                {loading && <CircularProgress size={20} color={'info'}/>} Submit
            </Button>)}
        </CardFooter>
    </Card>);
};

// Step components

const Step1: React.FC<{ formik: any }> = ({
                                              formik
                                          }: any) => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [uploadedBackUrl, setUploadedBackUrl] = useState('')
    const [openBack, setOpenBack,] = useState(false)
    const [openFront, setOpenFront,] = useState(false)
    const handleChangeOtp = (val: string) => {

        formik.setFieldValue

    }

    return (<div className="space-y-4">
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
                <div className="text-red-500 text-xs">{formik.errors.name}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="fatherName">Father's Name</Label>
            <Input
                id="fatherName"
                name="fatherName"
                value={formik.values.fatherName}
                onChange={formik.handleChange}

            />
            {formik.touched.fatherName && formik.errors.fatherName ? (
                <div className="text-red-500 text-xs">{formik.errors.fatherName}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs as any}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        format={'DD/MM/YYYY'}
                        value={formik.values.dob ? dayjs(formik.values.dob) : null} // Use dayjs to convert the value
                        onChange={(date: any) => {
                            let selectedDate = dayjs(date);
                            const today = dayjs();

                            let years = today.diff(selectedDate, 'year');
                            selectedDate = selectedDate.add(years, 'year');

                            let months = today.diff(selectedDate, 'month');

                            // Adjust for accurate months
                            const totalMonths = today.diff(dayjs(date), 'month');
                            years = Math.floor(totalMonths / 12);
                            months = totalMonths % 12;

                            // Log the age
                            console.log(`Age: ${years} years and ${months} months`);

                            // Optionally, you can store the age as a string or an object
                            formik.setFieldValue('age', `${years} years and ${months} months`);
                            formik.setFieldValue('dob', date ? date.toISOString() : ''); // Set the date in ISO format

                        }} name={'dob'}/>
                </DemoContainer>
            </LocalizationProvider>

            {formik.touched.dob && formik.errors.dob ? (
                <div className="text-red-500 text-xs">{formik.errors.dob}</div>) : null}
        </div>

        <div className="space-y-2">
            <Label htmlFor="age">
                Age
            </Label>
            <Input
                disabled
                id="age"
                name="age"
                type={'text'}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age ? (
                <div className="text-red-500 text-xs">{formik.errors.age}</div>) : null}
        </div>

        <div className="space-y-2">
            <Label htmlFor="documentType">Select Document Type</Label>
            <Select
                value={formik.values.documentType}
                onValueChange={(value) => formik.setFieldValue('documentType', value)}
            >
                <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select Document"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                    <SelectItem value="dob">DOB Certificate</SelectItem>
                </SelectContent>
            </Select>
            {formik.touched.documentType && formik.errors.documentType ? (
                <div className="text-red-500 text-xs">{formik.errors.documentType}</div>) : null}
        </div>

        {formik.values.documentType && (<>
            <div className="space-y-2">
                <Label htmlFor="documentNumber">
                    {formik.values.documentType === 'aadhar' ? 'Aadhar Number' : 'DOB Certificate Number'}
                </Label>

                {formik.values.documentType === 'aadhar' ?

                    <AadharInput value={formik.values.documentNumber} formik={formik} name={'documentNumber'}
                                 onBlur={formik.handleBlur} setFieldValue={formik.setFieldValue}/>

                    :

                    (<Input
                        id="documentNumber"
                        name="documentNumber"
                        value={formik.values.documentNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />)

                }


                {formik.touched.documentNumber && formik.errors.documentNumber ? (
                    <div className="text-red-500 text-xs">{formik.errors.documentNumber}</div>) : null}
            </div>
            <div className="space-y-2">
                <Label htmlFor="frontPhoto">Upload Front Photo</Label>
                <DocValidationComponent docType={formik.values.documentType === 'aadhar' ?'Aadhar' : 'Birth Certificate'}
                                        docNum={formik.values.documentNumber} currentUrl={formik.values.frontPhoto}
                                        callbackDelete={() => formik.setFieldValue('frontPhoto', '')}
                                        callback={(value: string) => formik.setFieldValue('frontPhoto', value)}/>
                {formik.touched.frontPhoto && formik.errors.frontPhoto ? (
                    <div className="text-red-500 text-xs">{formik.errors.frontPhoto}</div>) : null}
            </div>


            {formik.values.documentType !== 'dob' && (<div className="space-y-2">
                <Label htmlFor="backPhoto">Upload Back Photo</Label>
                <DocValidationComponent docType={'Aadhar'} side={'back'}
                    // setUploadedImageUrl={setUploadedBackUrl}
                                        docNum={formik.values.documentNumber} currentUrl={formik.values.backPhoto}
                                        callbackDelete={() => formik.setFieldValue('backPhoto', '')}
                                        callback={(value: string) => formik.setFieldValue('backPhoto', value)}/>
                {formik.touched.backPhoto && formik.errors.backPhoto ? (
                    <div className="text-red-500 text-xs">{formik.errors.backPhoto}</div>) : null}

            </div>)}

        </>)}
    </div>);
}

const Step2: React.FC<{ formik: any; }> = ({formik}) => (<div className="space-y-4">
    <div className="flex flex-col items-center">
        {/*<h1 className="font-bold text-xl text-center mb-5">*/}
        {/*    Mobile Verification*/}
        {/*</h1>*/}
        {/*<OtpLogin formik={formik}/>*/}
        <TwilioOtp formik={formik}/>
    </div>


    {/*<div className="space-y-2">*/}
    {/*    <Label htmlFor="mobile">Mobile</Label>*/}
    {/*    <Input*/}
    {/*        id="mobile"*/}
    {/*        name="mobile"*/}
    {/*        type="tel"*/}
    {/*        value={formik.values.mobile}*/}
    {/*        onChange={formik.handleChange}*/}
    {/*        */}
    {/*    />*/}

    {formik.errors.verification ? (<div className="text-red-500 text-xs">{formik.errors.verification}</div>) : null}
    {/*</div>*/}
</div>);

const Step3: React.FC<{ formik: any }> = ({formik}) => (<div className="space-y-4">
    <div className="space-y-2">
        <Label htmlFor="verification">Verification Status:<span
            className={'text-green-600'}>{formik.values.verification && 'Verified'}</span></Label>
    </div>
    <div className="space-y-2">
        <Label className="text-2xl" htmlFor="address">Address</Label>

        {/*<CardHeader>*/}
        {/*    <CardTitle className="text-2xl"> Address</CardTitle>*/}
        {/*</CardHeader>*/}
        {/*<CardContent className="space-y-4">*/}
        <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
                name="address.street"
                value={formik.values.address?.street}
                onChange={formik.handleChange}
                id="address.street" placeholder="Enter your street address"/>
            {formik.touched.address && formik.errors.address?.street ? (
                <div className="text-red-500 text-xs">{formik.errors.address?.street}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input name="address.district"
                   value={formik.values.address?.district}
                   onChange={formik.handleChange}
                   id="address.district" placeholder="Enter your district"/>
            {formik.touched.address && formik.errors.address?.district ? (
                <div className="text-red-500 text-xs">{formik.errors.address?.district}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input name="address.city"
                   value={formik.values.address?.city}
                   onChange={formik.handleChange}
                   id="address.city" placeholder="Enter your city"/>
            {formik.touched.address && formik.errors.address?.city ? (
                <div className="text-red-500 text-xs">{formik.errors.address?.city}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input name="address.state"
                   value={formik.values.address?.state}
                   onChange={formik.handleChange}
                   id="address.state" placeholder="Enter your state"/>
            {formik.touched.address && formik.errors.address?.state ? (
                <div className="text-red-500 text-xs">{formik.errors.address?.state}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input name="address.pincode"
                   value={formik.values.address?.pincode}
                   onChange={formik.handleChange}
                   id="address.pincode" placeholder="Enter your pincode"/>
            {formik.touched.address && formik.errors.address?.pincode ? (
                <div className="text-red-500 text-xs">{formik.errors.address?.pincode}</div>) : null}
        </div>

    </div>
    <div className="space-y-2">
        <Label>Select Residence Type</Label>
        <RadioGroup
            value={formik.values.residenceType}
            onValueChange={(value) => formik.setFieldValue('residenceType', value)}
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Permanent" id="permanent"/>
                <Label htmlFor="permanent">Permanent</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Temporary" id="temporary"/>
                <Label htmlFor="Temporary">Temporary</Label>
            </div>

        </RadioGroup>
        {formik.touched.residenceType && formik.errors.residenceType ? (
            <div className="text-red-500 text-xs">{formik.errors.residenceType}</div>) : null}

    </div>

    {formik.values.residenceType === 'Temporary' && <div className="space-y-2">
        <Label className="text-2xl" htmlFor="address">Permanent Address</Label>
        {/*<Card className="w-full">*/}
        {/*    <CardHeader>*/}
        {/*        <CardTitle className="text-2xl">Permanent Address</CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent className="space-y-4">*/}
        <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
                name="address1.street"
                value={formik.values.address1?.street}
                onChange={formik.handleChange}
                id="address1.street" placeholder="Enter your street address"/>
            {formik.touched.address1 && formik.errors.address1?.street ? (
                <div className="text-red-500 text-xs">{formik.errors.address1?.street}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input name="address1.district"
                   value={formik.values.address1?.district}
                   onChange={formik.handleChange}
                   id="address1.district" placeholder="Enter your district"/>
            {formik.touched.address1 && formik.errors.address1?.district ? (
                <div className="text-red-500 text-xs">{formik.errors.address1?.district}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input name="address1.city"
                   value={formik.values.address1?.city}
                   onChange={formik.handleChange}
                   id="address1.city" placeholder="Enter your city"/>
            {formik.touched.address1 && formik.errors.address1?.city ? (
                <div className="text-red-500 text-xs">{formik.errors.address1?.city}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input name="address1.state"
                   value={formik.values.address1?.state}
                   onChange={formik.handleChange}
                   id="address1.state" placeholder="Enter your state"/>
            {formik.touched.address1 && formik.errors.address1?.state ? (
                <div className="text-red-500 text-xs">{formik.errors.address1?.state}</div>) : null}
        </div>
        <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input name="address1.pincode"
                   value={formik.values.address1?.pincode}
                   onChange={formik.handleChange}
                   id="address1.pincode" placeholder="Enter your pincode"/>
            {formik.touched.address1 && formik.errors.address1?.pincode ? (
                <div className="text-red-500 text-xs">{formik.errors.address1?.pincode}</div>) : null}
        </div>
        {/*</CardContent>*/}
        {/**/}
        {/*</Card>*/}

    </div>}


    <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input
            id="occupation"
            name="occupation"
            value={formik.values.occupation}
            onChange={formik.handleChange}

        />
        {formik.touched.occupation && formik.errors.occupation ? (
            <div className="text-red-500 text-xs">{formik.errors.occupation}</div>) : null}
    </div>
    <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
            value={formik.values.category}
            onValueChange={(value) => formik.setFieldValue('category', value)}
        >
            <SelectTrigger id="category">
                <SelectValue placeholder="Select category"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="GEN">General</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
            </SelectContent>
        </Select>
        {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-xs">{formik.errors.category}</div>) : null}
    </div>
    <div className="space-y-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}

        />
        {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>) : null}
    </div>
</div>);

const Step4: React.FC<{ formik: any }> = ({
                                              formik, setUploadedPhotoFile
                                          }: any) => (<div className="space-y-4">
    <div className="space-y-2">
        <Label htmlFor="photo">Upload Photo</Label>
        {/*<Input*/}
        {/*    type="file"*/}
        {/*    id="photo"*/}
        {/*    name="photo"*/}
        {/*    onChange={(event:any) => {*/}
        {/*        formik.setFieldValue("photo", event.currentTarget.files[0]);*/}
        {/*    }}*/}
        {/*    */}
        {/*/>*/}
        <FileUploader setUploadFile={setUploadedPhotoFile} currentUrl={formik.values.photo}
                      callbackDelete={() => formik.setFieldValue('photo', '')}
                      callback={(value: string) => formik.setFieldValue('photo', value)}/>

        {formik.touched.photo && formik.errors.photo ? (
            <div className="text-red-500 text-xs">{formik.errors.photo}</div>) : null}
    </div>
</div>);

export default ApplicationFormComponent;
