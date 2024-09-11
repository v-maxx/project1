'use client'
import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp"
import {useToast} from "@/components/ui/use-toast";
import CircularProgress from "@mui/material/CircularProgress";
import {Badge} from "@/components/ui/badge";
import {Check} from "lucide-react";

const loadingIndicator = (<div role="status" className="flex justify-center">
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
</div>);
export default function TwilioOtp({formik}: any) {
    const [step, setStep] = useState<'send' | 'verify'>('send')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [message, setMessage] = useState('')
    const [optSendError, setOptSendError] = useState<any>(null)
    const [verificationError, setVerificationError] = useState<any>(null)
    const [verified, setVerified] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0);
    const [loading, setLoading] = useState(false)
    const handleResendSendOTP = async () => {
        if (resendCountdown <= 0) {
            await handleSendOTP()
        }
        console.log('Sending OTP to', phoneNumber)
        setStep('verify')
    }

    useEffect(() => {
        setPhoneNumber(formik.values.mobile)

    }, [formik.values.mobile]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCountdown]);


    const {toast} = useToast()

    useEffect(() => {
        setOtp('')
    }, [step]);
    const handleSendOTP = async () => {
        try {
            setLoading(true)

            const response = await fetch('/api/send-otp', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({phoneNumber: formik.values.mobile}),
            });

            if (!response.ok) {
                setLoading(false)
                setResendCountdown(0);
                console.log('errorred')
                setOptSendError(response.statusText)
                console.log('sendOTP error: ' + response.statusText)
                toast({
                    title: 'OTP ERROR', variant: "destructive", description: response.statusText, // action: (
                    //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                    // ),
                })
            } else {
                setResendCountdown(60);
                setLoading(false)
                const data = await response.json();
                toast({
                    title: 'OTP SENT', description: `OTP Sent to ${phoneNumber}, please check`, // action: (
                    //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                    // ),
                })
                setStep('verify')
                window.localStorage.setItem('sid', data.sid)
                console.log('errorred1')
            }

        } catch (e: any) {
            setLoading(false)
            setResendCountdown(0);
            console.log('errorred3')
            setOptSendError(e.message)
            console.log('sendOTP error: ' + e.message)
            toast({
                title: 'Somthing Went wrong', description: 'Please Try Again Later',
            })
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/verify-otp', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({phoneNumber: formik.values.mobile, code: otp}),
            });


            if (response.ok) {
                setLoading(false)
                const data = await response.json();
                setVerified(true)
                formik.setFieldValue('verification', true)
                setMessage(data.message);
            } else {
                setLoading(false)
                setVerificationError(response.statusText)
                toast({
                    title: 'OTP Verification ERROR', description: response.statusText, // action: (
                    //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                    // ),
                })

            }
        } catch (e: any) {
            setLoading(false)
            console.log('error', e.message)
        }

    };

    // const handleVerifyOTP = () => {
    //     // Here you would typically call an API to verify the OTP
    //     console.log('Verifying OTP', otp)
    //     // Reset the form after verification
    //     setStep('send')
    //     setPhoneNumber('')
    //     setOtp('')
    // }


    useEffect(() => {
        if (formik.values.verification) {
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


    return (<Card className="w-full">
        <CardHeader>
            <CardTitle>{step === 'send' ? 'Mobile Verification' : 'Verify OTP'}</CardTitle>
            <CardDescription>
                {step === 'send' ? 'Enter your phone number to receive an OTP' : `Enter the OTP sent to your phone +91${formik.values.mobile}`}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {!verified && step === 'send' && step !== 'verify' ? (<div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
          <span
              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
            +91
          </span>
                        <Input

                            id="mobile"
                            name="mobile"
                            placeholder="Enter your phone number"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="rounded-l-none ring-0 border focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0"
                            required
                        />
                    </div>

                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div className="text-red-500 text-xs">{formik.errors.mobile}</div>) : null}


                </div>
                <Button className="w-full" onClick={handleSendOTP}
                        disabled={loading || formik.errors.mobile || !formik.values.mobile}>{loading ?
                    <CircularProgress size={20} color={'primary'}/> : 'Send OTP'}</Button>
            </div>) : !verified && step !== 'send' && step === 'verify' ? (<div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        className={'flex justify-center content-center'}
                    >
                        <InputOTPGroup className={'flex justify-between content-center gap-4'}>
                            <InputOTPSlot className={'border'} index={0}/>
                            <InputOTPSlot className={'border'} index={1}/>
                            <InputOTPSlot className={'border'} index={2}/>
                            <InputOTPSlot className={'border'} index={3}/>
                            <InputOTPSlot className={'border'} index={4}/>
                            <InputOTPSlot className={'border'} index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button className="w-full" disabled={otp.length < 6 || loading} onClick={handleVerifyOTP}>{loading ?
                    <CircularProgress size={20} color={'primary'}/> : 'Verify OTP'}</Button>

                <div className={'flex justify-between items-center mt-5'}>
                    <Button
                        variant="link"

                        onClick={() => setStep('send')}
                    >
                        Back to Send OTP
                    </Button>


                    {!verified && <Button variant="link"

                                          disabled={formik.errors.mobile || loading || resendCountdown > 0}
                                          onClick={() => handleResendSendOTP()}

                    >
                        {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}` : loading ? "Sending OTP" : "Re-Send OTP"}
                    </Button>}

                </div>

            </div>) : verified && <div>

                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <Check className="mr-1 h-6 w-8"/>
                    Verified
                </Badge>
            </div>}
        </CardContent>
    </Card>)
}

