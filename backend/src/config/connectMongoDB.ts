import mongoose from "mongoose";

const DB = process.env.MONGODB_URI!.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD!
);

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log("connected succesfully to mongoDB ", conn.connection.host);
  } catch (error: any) {
    console.log("failed to connect to database", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
