import React from "react";
import loadable from "@loadable/component";

import "./src/styles/global.css";

const FirebaseProvider = loadable(
  () => import("./src/services/firebase/firebase-provider")
);

const AppProvider = loadable(() => import("./src/services/app/app-provider"));

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseProvider>
      <AppProvider>{element}</AppProvider>
    </FirebaseProvider>
  );
};
