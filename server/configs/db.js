import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongodbURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!mongodbURI) {
      throw new Error("MONGO_URI environment variable not set");
    }

    mongoose.connection.removeAllListeners("connected");
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    const connectOptions = dbName ? { dbName } : {};
    await mongoose.connect(mongodbURI, connectOptions);
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDb;
