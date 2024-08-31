'use client'
import React from 'react';
import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import OtpLogin from "@/components/@core/OtpLogin";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

// Components

// Define the form data interface
interface FormData {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    otp: string;
    verification: string;
    address: string;
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
    mobile: '',
    otp: '',
    verification: '',
    address: '',
    residenceType: '',
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
        mobile: Yup.string().required('Mobile is required'),
        frontPhoto: Yup.mixed().nullable().required('Front Photo is required'),
        backPhoto: Yup.mixed().nullable().required('Back Photo is required'),
    }),
    Yup.object({
        otp: Yup.string().required('OTP is required'),
    }),
    Yup.object({
        verification: Yup.string().required('Verification is required'),
        address: Yup.string().required('Address is required'),
        residenceType: Yup.string().required('Residence Type is required'),
        occupation: Yup.string().required('Occupation is required'),
        category: Yup.string().required('Category is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    Yup.object({
        photo: Yup.mixed().nullable().required('Photo is required'),
    }),
];

const ApplicationFormComponent: React.FC = () => {
    const [step, setStep] = React.useState<number>(1);

    const formik = useFormik<FormData>({
        initialValues,
        validationSchema: validationSchemas[step - 1], // Apply the correct validation schema for the current step
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleNext = async () => {
        const errors: FormikErrors<FormData> = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setStep((prev) => Math.min(prev + 1, 4)); // Total steps including OTP step
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

    const sendOTP = () => {
        // Logic to send OTP to the provided mobile number
        console.log("Sending OTP to mobile number:", formik.values.mobile);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 formik={formik} />;
            case 2:
                return <Step2 formik={formik} sendOTP={sendOTP} />;
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
            <CardHeader>
                <CardTitle>Application Form - Step {step} of 4</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4 bg-secondary h-2 rounded-full">
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

const Step1: React.FC<{ formik: any }> = ({ formik }) => (
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
        {/* Continue for other fields in Step 1 */}
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
            <Input
                id="frontPhoto"
                name="frontPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                formik.setFieldValue('frontPhoto', e.target.files[0]);
                            }
                }}
            />
            {formik.touched.frontPhoto && formik.errors.frontPhoto ? (
                <div className="text-red-500 text-xs">{formik.errors.frontPhoto}</div>
            ) : null}
        </div>
        <div className="space-y-2">
                    <Label htmlFor="backPhoto">Upload Back Photo</Label>
            <Input
                id="backPhoto"
                name="backPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                formik.setFieldValue('backPhoto', e.target.files[0]);
                            }
                }}
                    />
                </div>
            </>
        )}
        <div className="space-y-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-500 text-xs">{formik.errors.mobile}</div>
            ) : null}
        </div>
    </div>
);

const Step2: React.FC<{ formik: any; sendOTP: () => void }> = ({ formik, sendOTP }) => (
    <div className="space-y-4">
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-center mb-5">
                How to Add One-Time Password Phone Authentication
            </h1>

            <OtpLogin />
        </div>


        <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
                id="otp"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.otp && formik.errors.otp ? (
                <div className="text-red-500 text-xs">{formik.errors.otp}</div>
            ) : null}
        </div>
        <Button onClick={sendOTP}>Send OTP</Button>
    </div>
);

const Step3: React.FC<{ formik: any }> = ({ formik }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="verification">Verification Status</Label>
            <Input
                id="verification"
                name="verification"
                value={formik.values.verification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.verification && formik.errors.verification ? (
                <div className="text-red-500 text-xs">{formik.errors.verification}</div>
            ) : null}
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
            <Label>Residence Type</Label>
            <RadioGroup
                value={formik.values.residenceType}
                onValueChange={(value) => formik.setFieldValue('residenceType', value)}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">Temporary</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent">Permanent</Label>
                </div>
            </RadioGroup>
        </div>
        <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
                id="occupation"
                name="occupation"
                value={formik.values.occupation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
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
                    <SelectItem value="gen">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                </SelectContent>
            </Select>
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

const Step4: React.FC<{ formik: any }> = ({ formik }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo</Label>
            <Input
                type="file"
                id="photo"
                name="photo"
                onChange={(event:any) => {
                    formik.setFieldValue("photo", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
            />
            {formik.touched.photo && formik.errors.photo ? (
                <div className="text-red-500 text-xs">{formik.errors.photo}</div>
            ) : null}
        </div>
    </div>
);

export default ApplicationFormComponent;
