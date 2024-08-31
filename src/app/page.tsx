'use client'
import Image from "next/image";
import ApplicationFormComponent from "@/components/@core/application-form";
import {useEffect} from "react";

export default function Home() {

  async function createApplication(data:any) {
    try {
      const response = await fetch('/api/create-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers if necessary (e.g., authentication tokens)
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error:any) {
      console.error('Error creating application:', error);
      return { error: error.message };
    }
  }

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


   home


    </main>
  );
}
