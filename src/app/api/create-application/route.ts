import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import Application from "@/lib/db/models/ApplicationModel";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, fatherName, documentType, documentNumber, mobile, otp, verification, address, residenceType, occupation, category, email, frontPhoto, backPhoto, photo } = body;
        const secret = process.env.AUTH_SECRET;

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
            verification,
            address,
            residenceType,
            occupation,
            category,
            email,
            frontPhoto,
            backPhoto,
            photo,
            // initiatedBy:
        });

        // Save the document to the database
        const result = await newApplication.save();

        return Response.json({ success: true, message: 'Application Created successfully', application: result }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
