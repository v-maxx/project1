import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for the ApplicationScheme
interface IApplicationScheme extends Document {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    verification: boolean;
    address: any;
    address1: any;
    residenceType: 'Temporary' | 'Permanent';
    occupation: string;
    category: 'GEN' | 'OBC' | 'ST' | 'SC';
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
        dob: {
            type: String,
            required: [true, "DOB is required"],
            trim: true,
        },
        age: {
            type: String,
            required: [true, "Age is required"],
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
            street: {
                type: String,
                required: [true, 'Street is required'],
            },
            district: {
                type: String,
                required: [true, 'District is required'],
            },
            city: {
                type: String,
                required: [true, 'City is required'],
            },
            state: {
                type: String,
                required: [true, 'State is required'],
            },
            pincode: {
                type: String,
                required: [true, 'Pincode is required'],
                match: [/^\d{6}$/, 'Pincode must be exactly 6 digits'], // Validation for 6 digits
            }
        },
        address1: {
            street: {
                type: String,
                required: [false, 'Street is required'],
            },
            district: {
                type: String,
                required: [false, 'District is required'],
            },
            city: {
                type: String,
                required: [false, 'City is required'],
            },
            state: {
                type: String,
                required: [false, 'State is required'],
            },
            pincode: {
                type: String,
                required: [false, 'Pincode is required'],
                match: [/^\d{6}$/, 'Pincode must be exactly 6 digits'], // Validation for 6 digits
            }
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
            enum: ['GEN', 'OBC', 'ST','SC'],
            required: [true, 'Category is required'],
        },
        email: {
            type: String,
            required: [false, 'Email is required'],
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
