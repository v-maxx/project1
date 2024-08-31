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
const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
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

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser | any>('User', UserSchema);
export default User;
