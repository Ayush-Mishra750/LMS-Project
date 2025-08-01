import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDb connected successfully");
  } catch (error) {
    console.log("error occurred ", error);
  }
};
export default connectDb;
