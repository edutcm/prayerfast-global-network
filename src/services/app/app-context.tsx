// import libs
import { createContext, useContext } from "react";
import { AppContextProps } from "./app-provider";

// app context
const AppContext = createContext<AppContextProps>({
  geodata: [],
  setGeodata: () => [],
  switcher: false,
  toggleSwitcher: () => true || false,
  appCookies: false,
  setAppCookies: () => true || false,
  setCookieNotice: () => true || false,
  locale: "en",
});

export default AppContext;

export const useAppContext = () => useContext(AppContext);
