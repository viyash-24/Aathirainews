/**
 * MongoDB Connection Utility
 * ---------------------------
 * Uses Mongoose to connect to MongoDB.
 * Caches the connection in globalThis to prevent multiple
 * connections during hot-reloads (dev) and across serverless
 * function invocations (Vercel).
 */

import mongoose from "mongoose";

/**
 * Global cache interface to store the mongoose connection
 * across hot-reloads in development and serverless invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend globalThis to include our cached mongoose connection
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Use cached connection if available, otherwise initialize
const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

// Persist the cache on globalThis so it survives hot-reloads
globalThis.mongooseCache = cached;

/**
 * Connects to MongoDB and returns the mongoose instance.
 * Re-uses the existing connection if one is already established.
 */
async function connectDB(): Promise<typeof mongoose> {
  // Validate environment variable at runtime, not at import time
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "  MONGODB_URI is not defined. Please add it to your .env.local file."
    );
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering for serverless
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on failure so next call retries
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
