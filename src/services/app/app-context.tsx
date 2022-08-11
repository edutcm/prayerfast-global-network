// import libs
import { createContext } from "react";
import { AppContextProps } from "./app-provider";

// firebase context
const AppContext = createContext<AppContextProps>({
  geodata: [],
  setGeodata: () => [],
  switcher: false,
  toggleSwitcher: () => true || false,
  appCookies: false,
  setAppCookies: () => true || false,
  setCookieNotice: () => true || false,
});

export default AppContext;
