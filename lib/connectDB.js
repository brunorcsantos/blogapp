import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_DB_CONNECTION_STRING)
      .then(() => console.log("Connected to MongoDb!"));
  } catch (error) {
    console.log("Message: ", error)
  }
};

export default dbConnection;
