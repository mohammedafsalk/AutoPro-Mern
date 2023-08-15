import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ServiceCenter"
  },
});

const reviewModel = mongoose.model("Reviews", reviewSchema);
export default reviewModel;
