import mongoose from "mongoose";
const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected")
    }
    catch(err){
        console.log("database error",err)
    }
}
export default connectdb;