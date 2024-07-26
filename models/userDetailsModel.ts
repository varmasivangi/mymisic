import mongoose from "mongoose";




 const userDetailsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    createUserName:{
        type:String,
        require:true
    },
    createPassword:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        require:true
    },
    otp:{
        type:Number,
        require:true
    }
})




export const userDetails = mongoose.model("userDetails",userDetailsSchema)