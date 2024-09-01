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
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Parse the JSON request body
        const applicationId=params.id
        // const { ...updateFields } = body;

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
        const application = await Application.findOne(
            { _id: applicationId, initiatedBy: (token as any).user._id },

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




export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Get the application ID from the request params

        const secret = process.env.AUTH_SECRET;

        // Retrieve the token from the request for user authentication
        const token = await getToken({ req, secret });
        if (!token) {
            return Response.json({ error: 'Authorization token missing' }, { status: 401 });
        }

        // Connect to the database
        await mongooseConnect();

        // Find and delete the application by its ID
        const result = await Application.findOneAndDelete({
            _id: params.id,
            initiatedBy: (token as any).user._id // Ensure only the user who created the application can delete it
        });

        if (!result) {
            return Response.json({ error: 'Application not found or not authorized to delete' }, { status: 404 });
        }

        return Response.json({ success: true, message: 'Application deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
