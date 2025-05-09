import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp3K1kYyqaQZd1ow4aVX7FIj-BAkYwDyQ",
  authDomain: "moda-26b06.firebaseapp.com",
  projectId: "moda-26b06",
  storageBucket: "moda-26b06.appspot.com",
  messagingSenderId: "350177082746",
  appId: "1:350177082746:web:f1a613771e55305a766ac3"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app)