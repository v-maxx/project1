import React from 'react';
import ContactForm from "@/components/@core/contact-form";
import Image from "next/image";

const Page = () => {
    return (
        <div className={'container py-10 grid grid-cols-2 place-content-center place-items-center h-[100%] gap-10'}>

            <div className={'flex flex-col gap-4'}>
                <Image src={'/yojna.png'} alt={'bhagyalaxmi-yojna'} width={1200} height={500}/>
                <h1 className={''}>
                    We welcome your feedback and suggestion about the portal to help us further to serve you better. Please fill up the form below to write to us with your input and suggestion.

                </h1>
            </div>





            <ContactForm/>

        </div>
    );
};

export default Page;
