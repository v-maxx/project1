import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for the ApplicationScheme
interface IApplicationScheme extends Document {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    verification: boolean;
    address: string;
    address1: string;
    residenceType: 'Temporary' | 'Permanent';
    occupation: string;
    category: 'GEN' | 'OBC' | 'STSC';
    email: string;
    frontPhoto: string;
    backPhoto: string;
    photo: string;
    status: 'Pending' | 'Pending Payment' | 'Completed';
    initiatedBy: mongoose.Types.ObjectId; // Reference to a User
}

const ApplicationSchema: Schema<IApplicationScheme|any> = new mongoose.Schema<IApplicationScheme|any>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        fatherName: {
            type: String,
            required: [true, "Father's name is required"],
            trim: true,
        },
        documentType: {
            type: String,
            required: [true, 'Document type is required'],
        },
        documentNumber: {
            type: String,
            required: [true, 'Document number is required'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        verification: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        address1: {
            type: String,
            required: [false],
        },
        residenceType: {
            type: String,
            enum: ['Temporary', 'Permanent'],
            required: [true, 'Residence type is required'],
        },
        occupation: {
            type: String,
            required: [true, 'Occupation is required'],
        },
        category: {
            type: String,
            enum: ['General', 'OBC', 'STSC'],
            required: [true, 'Category is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please fill a valid email address',
            ],
        },
        frontPhoto: {
            type: String,
            required: [true, 'Front photo is required'],
        },
        backPhoto: {
            type: String,
            required: [false, 'Back photo is required'],
        },
        photo: {
            type: String,
            required: [true, 'Photo is required'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Pending Payment', 'Completed'],
            required: [true, 'Status is required'],
        },
        initiatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Application: Model<IApplicationScheme> = mongoose.models.Application || mongoose.model<IApplicationScheme | any>('Application', ApplicationSchema);

export default Application;
