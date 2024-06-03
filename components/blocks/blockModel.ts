import * as connections from "../../config/connection/connection";
import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  contract: { type: String, required: true },
  lastBlock: { type: Number, required: true },
  chainType: { type: String, required: true },
  cronInProcess: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default connections.db.model<any>('blocks', blockSchema);
