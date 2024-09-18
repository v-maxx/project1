import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import Application from "@/lib/db/models/ApplicationModel";
import {sendApplicationId} from "@/lib/twilio/helpers";

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON request body
        const body = await req.json();
        const {
            name,
            fatherName,
            documentType,
            documentNumber,
            mobile,
            otp,
            dob,
            age,
            verification,
            address,
            address1, // Added address1
            residenceType,
            occupation,
            category,
            email,
            frontPhoto,
            backPhoto,
            photo
        } = body;

        // Get the secret for token validation
        const secret = process.env.AUTH_SECRET;

        // Retrieve the token from the request
        const token = await getToken({ req, secret });
        if (!token) {
            return Response.json({ error: 'Authorization token missing' }, { status: 401 });
        }

        // Connect to the database
        await mongooseConnect();

        // Create a new Application document
        const newApplication = new Application({
            name,
            fatherName,
            documentType,
            documentNumber,
            mobile,
            otp,
            dob,
            verification,
            address,
            address1, // Included address1
            residenceType,
            occupation,
            category,
            email,
            frontPhoto,
            backPhoto,
            photo,
            age,
            status:'Pending Payment',
            initiatedBy: (token as any).user._id // Assuming token contains the userId; adjust as needed
        });

        // Save the document to the database
        const result = await newApplication.save();
        await sendApplicationId(result._id,mobile)
        // Respond with success message
        return Response.json({ success: true, message: 'Application Created successfully', application: result }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500,statusText:error.message });
    }
}
