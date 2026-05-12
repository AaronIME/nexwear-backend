import { initializeApp } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { envs } from './env.adapter';

const firebaseConfig = {
  apiKey: envs.FIREBASE_API_KEY,
  authDomain: envs.FIREBASE_AUTH_DOMAIN,
  projectId: envs.FIREBASE_PROJECT_ID,
  storageBucket: envs.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envs.FIREBASE_MESSAGING_SENDER_ID,
  appId: envs.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export class FirebaseAdapter {
  static uploadImage = async (file: Buffer, fileName: string): Promise<string> => {
    const storageRef = ref(storage, `nexwear/images/${fileName}`);
    console.log({fileName})
    await uploadBytes(storageRef, file);
    console.log("exito")
    return getDownloadURL(storageRef);

  };

  static deleteImage = async (url: string): Promise<void> => {
    if(!url.startsWith("https://firebasestorage.googleapis.com")) return;

    const fileUrl = new URL(url);

    const filePath = fileUrl.pathname.split("/").at(-1);

    if(!filePath) return;

    const decodedFilePath = decodeURIComponent(filePath!);
    
    const imgRef = ref(storage, decodedFilePath);

    await deleteObject(imgRef);
  };

  static getImageUrl = async (filename: string): Promise<string> => {
    const storageRef = ref(storage, filename);
    return getDownloadURL(storageRef);
  };
}
