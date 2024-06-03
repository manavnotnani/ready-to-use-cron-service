import { Schema, model, models } from "mongoose";
import * as connections from "../../config/connection/connection";

const BrandCollabSchema = new Schema({
  adId: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  influencerName: {
    type: String,
  },
  influencerAddress: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  requestSentStatus: {
    type: Boolean,
    default: true,
  },
  acceptedStatus: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  videoId: {
    type: String,
  },
  brandName: {
    type: String,
  },
  productName: {
    type: String,
  },
  brandAddress: {
    type: String,
  },
  score: {
    type: String,
  },
  canClaim: {
    type: Boolean,
    default: false,
  },
});

// Create a unique compound index on adId and influencerAddress
BrandCollabSchema.index({ adId: 1, influencerAddress: 1 }, { unique: true });

const BrandCollab =
  models.BrandCollab || model("BrandCollab", BrandCollabSchema);

export default connections.db.model("BrandCollab", BrandCollabSchema);
