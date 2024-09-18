'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import Image from "next/image";

export default function Home() {


    // async function createApplication(data:any) {
    //   try {
    //     const response = await fetch('/api/create-application', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Include any other headers if necessary (e.g., authentication tokens)
    //       },
    //       body: JSON.stringify(data)
    //     });
    //
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //
    //     const result = await response.json();
    //     return result;
    //   } catch (error:any) {
    //     console.error('Error creating application:', error);
    //     return { error: error.message };
    //   }
    // }

    const applicationData = {
        name: 'John Doe',
        fatherName: 'Richard Doe',
        documentType: 'Aadhar',
        documentNumber: '123456789012',
        mobile: '9876543210',
        otp: '123456',
        verification: false,
        address: '123 Main St',
        residenceType: 'Permanent',
        occupation: 'Engineer',
        category: 'General',
        email: 'john.doe@example.com',
        frontPhoto: 'http://example.com/front.jpg',
        backPhoto: 'http://example.com/back.jpg',
        photo: 'http://example.com/photo.jpg'
    };

    // useEffect(() => {
    //   createApplication(applicationData)
    //       .then(result => {
    //         console.log('Application created successfully:', result);
    //       })
    //       .catch(error => {
    //         console.error('Failed to create application:', error);
    //       });
    //
    // }, []);


    return (
        <div className="container py-10">
            <div className=" space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl font-bold mb-2">Bhagya Lakshmi Yojana 2024</h1>
                    <p className="text-lg">Empowering daughters of poor families for a better future</p>
                </header>

                <Image src={'/heading-yojna.png'} alt={'bhagyalaxmi-yojna'} width={1200} height={500}/>



                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            The government has initiated the Bhagya Lakshmi Yojana 2024 to support the birth of
                            daughters in poor families and secure their future. This scheme provides financial
                            assistance of up to Rs 2 lakh to girls from birth to marriage through an online application
                            process.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Objective</CardTitle>
                    </CardHeader>
                    <Image src={'/yojna.png'} alt={'bhagyalaxmi-yojna'} width={1200} height={500}/>
                    <CardContent className={'py-8'}>
                        <p className="text-gray-700 font-semibold text-2xl">
                            Launched in 2017, the main objectives of the Bhagyalakshmi Yojana are:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 font-semibold">
                            <li>Increase the birth rate of girls</li>
                            <li>Provide good education</li>
                            <li>Offer financial assistance up to Rs 2 lakh to make them self-reliant</li>
                        </ul>
                    </CardContent>
                </Card>


                <Accordion type="single" className="bg-white shadow-lg rounded-lg">
                    <div >
                        <h2 className="text-xl px-6 py-4">Required
                            Documents</h2>
                        <div className="px-6 pb-4">
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Birth certificate of daughter (girl)</li>
                                <li>Rajasthan Bhagyalakshmi Yojana application form</li>
                                <li>Certificate of parents / guardian</li>
                                <li>BPL card of the family</li>
                                <li>Income certificate of the family</li>
                                <li>Bank account information of the beneficiary</li>
                                <li>Mobile number</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl px-6 py-4">Benefits</h2>
                        <div className="px-6 pb-4">
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Promotion of birth of daughters</li>
                                <li>Educational assistance: Annual scholarships from Rs 300 to Rs 1000 till class 10th
                                </li>
                                <li>Health insurance coverage up to Rs 25,000 per year</li>
                                <li>Financial assistance through parents or guardian</li>
                                <li>Accident and death benefits: Rs 1 lakh for parental accident, Rs 42,500 for natural
                                    death of beneficiary
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl px-6 py-4">How to Apply</h2>
                        <div className="px-6 pb-4">
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>Visit the Bhagya Lakshmi Yojana website and click on online registration</li>
                                <li>Fill in the registration form with correct information</li>
                                <li>Upload required documents</li>
                                <li>Submit the form</li>
                                <li>Receive and save the Acknowledgement Number for future reference</li>
                            </ol>
                        </div>
                    </div>
                </Accordion>
                <Image src={'/image2.png'} alt={'bhagyalaxmi-yojna'} width={1200} height={500}/>
            </div>
        </div>

    );
}
