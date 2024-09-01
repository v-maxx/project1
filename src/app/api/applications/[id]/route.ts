import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongooseConnect from "@/lib/db/mongoose";
import Application from "@/lib/db/models/ApplicationModel";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Parse the JSON request body
        const body = await req.json();
        const applicationId=params.id
        const { ...updateFields } = body;

        // Get the secret for token validation
        const secret = process.env.AUTH_SECRET;

        // Retrieve the token from the request
        const token = await getToken({ req, secret });
        if (!token) {
            return Response.json({ error: 'Authorization token missing' }, { status: 401 });
        }

        // Connect to the database
        await mongooseConnect();

        // Find the application by ID and update fields
        const application = await Application.findOneAndUpdate(
            { _id: applicationId, initiatedBy: (token as any).user._id },
            { $set: updateFields },
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!application) {
            return Response.json({ error: 'Application not found or not authorized to update' }, { status: 404 });
        }

        // Respond with the updated application
        return Response.json({ success: true, application }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
