import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: false,
    },
    resumeProfileData: {
      type: Object,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

// if(mongoose.models && mongoose.models.User) {
//     delete mongoose.models.User;
// }
