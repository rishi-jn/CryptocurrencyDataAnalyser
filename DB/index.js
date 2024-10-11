import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";
const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
    console.log(`\n Mongoose connected !! DB host `, res.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;