import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import Application from "@/lib/db/models/ApplicationModel";

export async function GET(req: NextRequest) {
    try {
        // Get the secret for token validation
        const secret = process.env.AUTH_SECRET;

        // Retrieve the token from the request
        const token = await getToken({ req, secret });
        if (!token) {
            return Response.json({ error: 'Authorization token missing' }, { status: 401 });
        }

        // Connect to the database
        await mongooseConnect();

        // Fetch all applications initiated by the user
        const applications = await Application.find({ initiatedBy: (token as any).user._id }).sort({ updatedAt: -1 });

        // Respond with the applications
        return Response.json({ success: true, applications }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
