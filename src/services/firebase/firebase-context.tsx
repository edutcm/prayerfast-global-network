// import libs
import { createContext } from "react";
// import { FirebaseContextData } from "firebase/app";
import { FirebaseContextData } from "../firebase";

// firebase context
const FirebaseContext = createContext<FirebaseContextData>({
  firebase: null,
  firestore: null,
  authToken: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,
  setAuthToken: () => {},
  logout: () => {},
});

export default FirebaseContext;
