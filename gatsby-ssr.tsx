import React from "react";
import loadable from "@loadable/component";

import "./src/styles/global.css";

const AppProvider = loadable(() => import("./src/services/app/app-provider"));

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
