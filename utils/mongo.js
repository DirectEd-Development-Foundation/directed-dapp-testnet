import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://eebiyenrin:9GxPzqc4RgQ7JNy4@cluster0.1mflyzk.mongodb.net/dapp?retryWrites=true&w=majority"

if(!MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if(cached.conn) {
        return cached.conn
    }
    
    if(!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect