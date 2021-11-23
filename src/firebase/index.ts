import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAe1JIJ_Gc7_pD4niHlWjGJIYzak1UUc_A",
  authDomain: "getmeurl-d6a90.firebaseapp.com",
  projectId: "getmeurl-d6a90",
  storageBucket: "getmeurl-d6a90.appspot.com",
  messagingSenderId: "482754659624",
  appId: "1:482754659624:web:39fe174869c6f5eb377c1d",
  measurementId: "G-6THDCHBS0X"
};



const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
