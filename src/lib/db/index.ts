import { MongoClient, Db } from 'mongodb';

declare global {
    // Allow global `var` declarations
    var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO) {
    throw new Error('Please add your Mongo URI to .env.local');
}

const uri: string = process.env.MONGO;
const options = {};

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so we only create the client once
    if (!globalThis._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// This function returns both the Db instance and the MongoClient instance
export async function getDb(): Promise<{ db: Db, client: MongoClient }> {
    const client = await clientPromise;
    const db = client.db('project0');
    return { db, client };
}

export default clientPromise;
