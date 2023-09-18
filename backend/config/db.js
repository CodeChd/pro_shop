import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
  } catch (e) {
    console.log(`Error: ${e}`);
    process.exit(1);
  }
};

export default connectDB;
