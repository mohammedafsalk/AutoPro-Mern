import mongoose from "mongoose";
import dayjs from "dayjs";
const ServiceCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    location: {
      type: String,
    },
    district: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    proof: {
      type: Object,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    logo: {
      type: Object,
      required: true,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
    permission: {
      type: Boolean,
      default: false,
    },
    rejectMessage: {
      type: String,
      default: "",
    },
    wallet: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ServiceCenterModel = mongoose.model("ServiceCenter", ServiceCenterSchema);
export default ServiceCenterModel;
