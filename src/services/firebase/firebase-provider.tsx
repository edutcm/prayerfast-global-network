// import libs
import React, {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { checkIsClient } from "../../utils/client";
import { getFirebase } from "./get-firebase-instance";
import * as storage from "../../utils/storage";

// import components
import FirebaseContext from "./firebase-context";

// firebase context data
export interface FirebaseContextData {
  firebase?: firebase.app.App | null;
  firestore?: firebase.firestore.Firestore | null;
  isLoading?: boolean;
  isLoggedIn?: boolean;
  profile?: firebase.User | null;
  authToken?: string | null;
  setAuthToken?: (authToken: string | null) => void;
  logout?: () => void;
}

interface FirebaseProviderProps extends FirebaseContextData {
  children: React.ReactNode;
}

// firebase provider
const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  // check if is browser
  const isClient: boolean = useMemo(() => checkIsClient(), []);

  // authToken
  let authTokenLocal = null;
  if (isClient) {
    authTokenLocal = storage.local.getItem("authToken") || null;
  }

  // state management
  const [firebase, setFirebase] = useState<firebase.app.App | null>(null);
  const [firestore, setFirestore] =
    useState<firebase.firestore.Firestore | null>(null);
  const [auth, setAuth] = useState<firebase.auth.Auth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<firebase.User | null>(null);
  const [authToken, setAuthToken]: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ] = useState(authTokenLocal);

  // set auth token to local storage and state
  const onSetAuthToken = (token: string | null) => {
    setAuthToken(token);
    if (token) {
      storage.local.setItem("authToken", token);
    }
  };

  // logout of firebase
  const logout = () => {
    console.log("logout");
    if (isClient && auth) {
      auth.signOut();
      storage.local.removeItem("authToken");
    }
  };

  // set firebase instance
  useEffect(() => {
    const firebaseInstance = getFirebase();
    setFirebase(firebaseInstance);

    if (firebaseInstance) {
      setFirestore(firebaseInstance.firestore());
      setIsLoading(false);

      let auth: firebase.auth.Auth;
      if (isClient) {
        auth = firebaseInstance.auth();
        setAuth(auth);
      }
    }
  }, []);

  // get the logged in user
  useEffect(() => {
    if (isClient && auth) {
      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setProfile(user);
          setIsLoggedIn(true);
        } else {
          setProfile(null);
          setIsLoggedIn(false);
        }
      });

      // Unsubscribe to the listener when unmounting
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  // get the token
  useEffect(() => {
    if (isClient && !authToken) {
      const token = storage.local.getItem("authToken");

      if (token) {
        onSetAuthToken(token);
      }
    }
  }, [authToken, isClient]);

  return (
    <FirebaseContext.Provider
      value={{
        authToken,
        firebase,
        firestore,
        isLoading,
        isLoggedIn,
        profile,
        logout,
        setAuthToken: onSetAuthToken,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
