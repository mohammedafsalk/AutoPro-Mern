import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    admin:{
        type:String,
        default:false
    },
    mobileNo:{
        type:Number,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    }

})

const UserModel=mongoose.model("User", UserSchema)
export default UserModel