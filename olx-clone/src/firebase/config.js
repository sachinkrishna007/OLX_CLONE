import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage'
import 'firebase/auth'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIc_Rw_yBALDoY4JV6MUMHwxzX75cW3q4",
    authDomain: "olx-demo-90ed0.firebaseapp.com",
    projectId: "olx-demo-90ed0",
    storageBucket: "olx-demo-90ed0.appspot.com",
    messagingSenderId: "290077371480",
    appId: "1:290077371480:web:e4451c84a473fe56532e2d",
    measurementId: "G-GZ012RM6N4"
  };

  const firebaseapp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseapp)
  
  export default db