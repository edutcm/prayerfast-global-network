import React from "react";
import loadable from "@loadable/component";

import "./src/styles/global.css";

const FirebaseProvier = loadable(
  () => import("./src/services/firebase/firebase-provider")
);

const AppProvider = loadable(() => import("./src/services/app/app-provider"));

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseProvier>
      <AppProvider>{element}</AppProvider>
    </FirebaseProvier>
  );
};
