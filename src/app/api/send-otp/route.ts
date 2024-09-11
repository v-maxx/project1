import {NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import twilio from 'twilio';
import {sendApplicationId} from "@/lib/twilio/helpers";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {

    const body = await req.json();
    const {
        phoneNumber
    } = body;
    const secret = process.env.AUTH_SECRET;
    try {
        const token = await getToken({req, secret});
        // Parse the JSON request body

        if (!token) {
            return Response.json({error: 'Authorization token missing'}, {status: 401});
        }

        const verification= await client.verify.v2.services("VAe94b5286ade4b40380ad71a04cc72475")
            .verifications
            .create({to: `+91${phoneNumber}`, channel: 'sms'})
            .then(verification => console.log('verification--',verification,verification.sid));

        console.log('veriofication result--',verification)




        return Response.json({success: true, message: 'OTP sent', sid: verification}, {status: 200});
    }
    catch (error: any) {
        console.error(error);
        return Response.json({error, message: 'Failed to send OTP'}, {status: 500, statusText: error.message});
    }
}
