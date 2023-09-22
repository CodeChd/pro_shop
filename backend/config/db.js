import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected");
//   } catch (e) {
//     console.log(`Error: ${e}`);
//     process.exit(1);
//   }
// };

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pro_shop");
    console.log("Connected");
  } catch (e) {
    console.log(`Error: ${e}`);
    process.exit(1);
  }
};

export default connectDB;
