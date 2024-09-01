"use client";

import {
    ConfirmationResult, getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import {getApp, getApps, initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {Label} from "@/components/ui/label";
import {toast} from "@/components/ui/use-toast";
import {Badge} from "@/components/ui/badge";
import {Check} from "lucide-react";



function OtpLogin({formik}:any) {
    const firebaseConfig = {
        apiKey: "AIzaSyCiBNYzNw9l408GTkHcJbnMVQz76zJx9SU",
        authDomain: "application-manager-ba97d.firebaseapp.com",
        projectId: "application-manager-ba97d",
        storageBucket: "application-manager-ba97d.appspot.com",
        messagingSenderId: "496613706956",
        appId: "1:496613706956:web:dd8891f342ac5f4d9b0669",
        measurementId: "G-QT3S23JNMM"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const [verified, setVerified] = useState(false)

// Initialize Firebase
//      const app =getApps().length===0  ? initializeApp(firebaseConfig) :getApp();

    const  auth=getAuth()
    auth.useDeviceLanguage()
    // export {auth}

    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState("");
    const [resendCountdown, setResendCountdown] = useState(0);

    const [recaptchaVerifier, setRecaptchaVerifier] =
        useState<RecaptchaVerifier | null>(null);

    const [confirmationResult, setConfirmationResult] =
        useState<ConfirmationResult | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
       if (formik.values.verification){
           setVerified(true)
       }

    }, []);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCountdown]);

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
            }
        );

        setRecaptchaVerifier(recaptchaVerifier);

        return () => {
            recaptchaVerifier.clear();
        };
    }, [auth]);

    useEffect(() => {
        const hasEnteredAllDigits = otp.length === 6;
        if (hasEnteredAllDigits) {
            verifyOtp();
        }
    }, [otp]);

    const verifyOtp = async () => {
        startTransition(async () => {
            setError("");

            if (!confirmationResult) {
                setError("Please request OTP first.");
                return;
            }

            try {
                await confirmationResult?.confirm(otp);
                setVerified(true)
                formik.setFieldValue('verification',true)
                 // router.replace("/");
            } catch (error:any) {
                console.log(error);

                setError("Failed to verify OTP. Please check the OTP.");
            }
        });
    };






    const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
        // e?.preventDefault();

        setResendCountdown(60);

        startTransition(async () => {
            setError("");

            if (!recaptchaVerifier) {
                return setError("Something Went Wrong!");
            }

            try {
                const confirmationResult = await signInWithPhoneNumber(
                    auth,
                    formik.values.mobile,
                    recaptchaVerifier
                );

                setConfirmationResult(confirmationResult);
                toast({
                    title: "OTP sent successfully.",
                    description: "Check your provide Cantact Number ",
                    // action: (
                    //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                    // ),
                })
                // setSuccess("OTP sent successfully.");
            } catch (err: any) {
                console.log(err);
                setResendCountdown(0);

                if (err.code === "auth/invalid-phone-number") {
                    setError("Invalid phone number. Please check the number.");
                } else if (err.code === "auth/too-many-requests") {
                    setError("Too many requests. Please try again later.");
                } else {
                    setError("Failed to send OTP. Please try again.");
                }
            }
        });
    };

    const loadingIndicator = (
        <div role="status" className="flex justify-center">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {!confirmationResult && !verified && (

                <div className="space-y-2 w-full">
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


                // <form onSubmit={requestOtp}>
                //     <Input
                //         className="text-black"
                //         type="tel"
                //         value={phoneNumber}
                //         onChange={(e) => setPhoneNumber(e.target.value)}
                //     />
                //     <p className="text-xs text-gray-400 mt-2">
                //         Please enter your number with the country code (i.e. +44 for UK)
                //     </p>
                // </form>
            )}

            {!verified && confirmationResult && (
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            )}
            {
                verified &&
                <div>

                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        <Check className="mr-1 h-6 w-8" />
                        Verified
                    </Badge>
                </div>
            }


            {!verified && <Button
                disabled={formik.errors.mobile || isPending || resendCountdown > 0}
                onClick={() => requestOtp()}
                className="mt-5"
            >
                {resendCountdown > 0
                    ? `Resend OTP in ${resendCountdown}`
                    : isPending
                        ? "Sending OTP"
                        : "Send OTP"}
            </Button>}

            <div className="p-10 text-center">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </div>

            <div id="recaptcha-container" />

            {isPending && loadingIndicator}
        </div>
    );
}

export default OtpLogin;
