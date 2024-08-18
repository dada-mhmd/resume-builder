import firebaseAppConfig from '@/config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFileToFirebaseAndReturnUrl = async (file: any) => {
  try {
    const storageRef = getStorage(firebaseAppConfig);
    const fileRef = ref(storageRef, file.name);
    const uploadedFileRes = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(uploadedFileRes.ref);
    return url;
  } catch (error) {
    throw error;
  }
};
