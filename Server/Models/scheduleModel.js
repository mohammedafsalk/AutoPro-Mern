import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    serviceCenterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceCenter'
    },
    monday:{
        type:Boolean,
        default:false
    },
    tuesday:{
        type:Boolean,
        default:false
    },
    wednesday:{
        type:Boolean,
        default:false
    },
    thursday:{
        type:Boolean,
        default:false
    },
    friday:{
        type:Boolean,
        default:false
    },
    saturday:{
        type:Boolean,
        default:false
    },
    sunday:{
        type:Boolean,
        default:false
    },
    slot:{
        type:Number,
        default:10,
        required:true
    }
  },
  { timestamps: true }
);

const ScheduleModel = mongoose.model("Schedule", schema);
export default ScheduleModel;
