import { Schema, model, models } from "mongoose";
import * as connections from "../../config/connection/connection";
  
const AdSchema = new Schema({
  productName: {
    type: String,
  },
  budget: {
    type: Number,
  },
  numberOfTargetedAds: {
    type: Number,
  },
  adId: {
    type: String,
    unique: true,
  },
  brandAddress: {
    type: String,
  },
  acceptedUserAddress: {
    type: Array,
  },
});

const Ad = models.Ad || model("Ad", AdSchema);

export default connections.db.model("Ad", AdSchema);
