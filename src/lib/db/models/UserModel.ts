
//
// import mongoose, { Document, Model, Schema } from 'mongoose';
//
// // Define the TypeScript interface for a User
// interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string;
//     createdAt: Date;
// }
//
// // Define the Mongoose schema for a User
// const UserSchema: Schema<IUser> = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         trim: true,
//         maxlength: [100, 'Name cannot be more than 100 characters'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         match: [
//             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//             'Please fill a valid email address',
//         ],
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters long'],
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });
//
// // Export the model with TypeScript support
// const User: Model<IUser | any> = mongoose.models.User || mongoose.model<IUser | any >('User', UserSchema);
// export default User;
//


import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for the ApplicationScheme
interface IApplicationScheme extends Document {
    name: string;
    fatherName: string;
    documentType: string;
    documentNumber: string;
    mobile: string;
    otp: string;
    verification: boolean;
    address: string;
    residenceType: 'Temporary' | 'Permanent';
    occupation: string;
    category: 'General' | 'OBC';
    email: string;
    frontPhoto: string;
    backPhoto: string;
    photo: string;
}

// Define the Mongoose schema for ApplicationScheme
const ApplicationSchema= new mongoose.Schema<IApplicationScheme>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    fatherName: {
        type: String,
        required: [true, 'Father\'s name is required'],
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
    otp: {
        type: String,
        required: [true, 'OTP is required'],
    },
    verification: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
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
        enum: ['General', 'OBC'],
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
        required: [true, 'Back photo is required'],
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
    },
});

// Export the model with TypeScript support
const Application: Model<IApplicationScheme | any> = mongoose.models.ApplicationSchema || mongoose.model<IApplicationScheme | any>('Application', ApplicationSchema);
export default Application;



import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for a User
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isActive?: boolean;
    address?: string;
    phone?: string;
    role: 'Super admin' | 'Admin' | 'Volunteer';
    applicationsCompleted: number;
}

// Define the Mongoose schema for User
const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [20, 'Username cannot be more than 20 characters long'],
            trim: true, // Ensures no leading or trailing spaces
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please fill a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        address: {
            type: String,
            trim: true, // Ensures no leading or trailing spaces
        },
        phone: {
            type: String,
            match: [
                /^[0-9]{10}$/,
                'Please fill a valid phone number with 10 digits',
            ],
        },
        role: {
            type: String,
            enum: ['Super admin', 'Admin', 'Volunteer'],
            default: 'Volunteer',
        },
        applicationsCompleted: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Export the model with TypeScript support
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
