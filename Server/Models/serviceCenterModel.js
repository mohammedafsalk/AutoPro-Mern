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
    mobile: {
      type: Number,
    },
    proof: {
      type: Object,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    categories: {
      type: Array,
      default: [],
    },
    brands: {
      type: Array,
      default: [],
    },
    logo: {
      type: Object,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
    permission: {
      type: Boolean,
      default: false,
    },
    pickUpPrice: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    rejectMessage: {
      type: String,
      default: "",
    },
    wallet: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ServiceCenterModel = mongoose.model("ServiceCenter", ServiceCenterSchema);
export default ServiceCenterModel;
