import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ServiceCenter"
  },
});

const locationModel = mongoose.model("Location", LocationSchema);
export default locationModel;
