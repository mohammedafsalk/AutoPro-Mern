import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    serviceCenterId:{
        type:mongoose.Schema.Types.ObjectId;
        ref:'ServiceCenter'
    },
    mon:{
        type:Boolean,
        default:false
    },
    tue:{
        type:Boolean,
        default:false
    },
    tue:{
        type:Boolean,
        default:false
    },
    wed:{
        type:Boolean,
        default:false
    },
    fri:{
        type:Boolean,
        default:false
    },
    sat:{
        type:Boolean,
        default:false
    },
    sun:{
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

const ScheduleModel = mongoose.model("ServiceCenter", schema);
export default ScheduleModel;
