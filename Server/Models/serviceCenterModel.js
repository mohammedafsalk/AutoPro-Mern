import mongoose from "mongoose";
const ServiceCenterSchema = new mongoose.Schema({
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
});

const ServiceCenterModel = mongoose.model("ServiceCenter", ServiceCenterSchema);
export default ServiceCenterModel;
