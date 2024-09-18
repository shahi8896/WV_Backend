import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { config } from "dotenv";
config({
    path: "./.env",
});
const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTIED TO DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB coonection FAILED ", error);
        process.exit(1);
    }
};
export default connectionDB;
