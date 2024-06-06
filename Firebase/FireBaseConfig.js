import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcH90wzOo0vHZxDTlKphLGcFQWCQ0p-_Q",
  authDomain: "task-management-75a56.firebaseapp.com",
  projectId: "task-management-75a56",
  storageBucket: "task-management-75a56.appspot.com",
  messagingSenderId: "789839683312",
  appId: "1:789839683312:web:b25907261d1fa0e9242c35",
  databaseURL: "https://task-management-df2ea-default-rtdb.firebaseio.com/",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getDatabase(app);

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCqwJns5e8Ru3VhI5lhjYQNgcmFXvfqjNQ",
//   authDomain: "task-management-df2ea.firebaseapp.com",
//   databaseURL: "https://task-management-df2ea-default-rtdb.firebaseio.com",
//   projectId: "task-management-df2ea",
//   storageBucket: "task-management-df2ea.appspot.com",
//   messagingSenderId: "908798564100",
//   appId: "1:908798564100:web:1ae14cc9aad1fc57b5e251",
//   measurementId: "G-0P0GPPCL3L",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { app, auth };
