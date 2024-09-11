import {NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;


const client = twilio(accountSid, authToken);


export async function POST(req: NextRequest) {

    const body = await req.json();
    const {
        phoneNumber, code
    } = body;
    const secret = process.env.AUTH_SECRET;
    try {
        const token = await getToken({req, secret});
        if (!token) {
            return Response.json({error: 'Authorization token missing'}, {status: 401});
        }
        // const verificationCheck = client.verify.v2.services("VAb883d19f0b08e4c8898daa2a6fec21bb")
        //     .verificationChecks
        //     .create({to: `+91${8447372717}`, code: `${code}`})
        //     .then(verification_check => console.log(verification_check.status));


        // const verificationCheck = await client.verify.services(verifyServiceSid)
        //     .verificationChecks
        //     .create({
        //         to: phoneNumber,
        //         code: code,
        //     });


        const verificationCheck = await client.verify
            .v2.services('VAe94b5286ade4b40380ad71a04cc72475')
            .verificationChecks.create({ to:`+91${phoneNumber}`, code });

        if (verificationCheck.status === 'approved') {
            return  Response.json({ message: 'OTP verified successfully',success:true },{status: 200, statusText:'OTP verified successfully'});

        }
        else {
            return   Response.json({ message: 'Invalid OTP',success:false },{status: 400, statusText:'Invalid OTP'});
        }




        // if (verificationCheck.status === 'approved') {
        //    return  Response.json({ message: 'OTP verified successfully',success:true },{status: 200, statusText:'OTP verified successfully'});
        // } else {
        //   return   Response.json({ message: 'Invalid OTP',success:false },{status: 400, statusText:'Invalid OTP'});
        // }
    }

        // Save the document to the database
        // const result = await newApplication.save();

        // Respond with success message

    catch (error: any) {
        console.error(error);
        return Response.json({error, message: 'OTP verification failed'}, {status: 500, statusText: error.message});
    }
}
