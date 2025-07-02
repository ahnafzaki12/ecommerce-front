import mongoose from "mongoose";

export default function mongooseConnect(){
    if (mongoose.connection.readyState >= 1){
        return;
    } else {
        const uri = process.env.MONGODB_URI!;
        return mongoose.connect(uri);
    }
}