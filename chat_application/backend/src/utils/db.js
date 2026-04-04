import moongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await moongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error in connecting to the database: ", err);
  }
};

export default connectDB;
