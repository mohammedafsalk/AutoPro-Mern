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
    pickUpPrice: {
      type: Array,
      default: [],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
