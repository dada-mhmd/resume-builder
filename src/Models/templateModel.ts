import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    html: { type: String, required: true },
    isOnlyForSubscribers: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Template =
  mongoose.models.Template || mongoose.model('Template', templateSchema);

export default Template;
