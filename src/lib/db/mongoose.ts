import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.MONGO as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGO environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */

// Extend the NodeJS.Global interface to include our mongoose property
declare global {
    namespace NodeJS {
        interface Global {
            mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
        }
    }
}

// Check if the global object already has a mongoose property, if not initialize it
(globalThis as any).mongoose = (globalThis as any).mongoose || { conn: null, promise: null };

// Cache the mongoose connection
let cached = (globalThis as any).mongoose;

async function mongooseConnect(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose:any) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default mongooseConnect;
