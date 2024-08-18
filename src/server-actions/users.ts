'use server';

import { currentUser } from '@clerk/nextjs/server';

import User from '@/Models/userModel';
import connectDB from '@/config/database';

connectDB();

export const getCurrentUserFromDatabase = async () => {
  try {
    const clerkUser = await currentUser();
    const clerkUserId = clerkUser?.id;

    // check if user exist in db
    const user = await User.findOne({ clerkUserId });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // create user if not exists in db
    const userObj = {
      clerkUserId,
      name: clerkUser?.firstName + ' ' + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      profilePictureUrl: clerkUser?.imageUrl,
      resumeProfileData: {},
    };

    const newUser = new User(userObj);
    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateUserProfile = async ({
  userId = '',
  data = {},
}: {
  userId: string;
  data: any;
}) => {
  try {
    const res = await User.findByIdAndUpdate(userId, data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
