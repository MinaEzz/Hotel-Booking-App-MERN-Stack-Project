import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("connected succesfully to mongoDB ", conn.connection.host);
  } catch (error: any) {
    console.log("failed to connect to database", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
