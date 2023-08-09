import mongoose, { Schema } from 'mongoose';

const bulkMailSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  template: { type: String, required: true },
  passingData: Schema.Types.Mixed,
  additionData: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('bulkMail', bulkMailSchema, 'BulkMail');
