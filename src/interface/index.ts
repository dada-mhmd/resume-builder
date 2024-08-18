export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  resumeProfileData: any;
  isAdmin: boolean;
}

export interface ITemplate {
  _id: string;
  name: string;
  html: string;
  isOnlyForSubscribers: boolean;
  thumbnail: string;
}
