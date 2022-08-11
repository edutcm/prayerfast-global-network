// import libs
import "firebase/compat/auth";
import { checkIsClient } from "../../utils/client";
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";

// configuration
const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

// firebase app instance
let instance: firebase.app.App | null =
  firebase.app.length > 0 ? firebase.apps[0] : null;

// get firebase
export const getFirebase = () => {
  if (checkIsClient()) {
    if (instance) return instance;
    instance = firebase.initializeApp(config);
    // @todo explore if this is needed
    // const analytics = getAnalytics(instance)
    return instance;
  }

  return null;
};
