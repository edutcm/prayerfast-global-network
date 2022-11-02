// import libs
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { GeodataProps } from "../geolocation";

export interface AppContextProps {
  geodata?: Array<GeodataProps>;
  setGeodata?: Dispatch<SetStateAction<Array<GeodataProps>>>;
  switcher: boolean;
  toggleSwitcher: Dispatch<SetStateAction<boolean>>;
  mobileMenu: boolean;
  setMobileMenu: Dispatch<SetStateAction<boolean>>;
  appCookies?: boolean;
  setAppCookies?: Dispatch<SetStateAction<boolean>>;
  joinButton: boolean;
  setJoinButton: Dispatch<SetStateAction<boolean>>;
  setCookieNotice: (value: boolean) => boolean;
  setPrayerFastButton?: (value: boolean) => boolean;
  locale: string;
}

export const defaultState = {
  geodata: [],
  setGeodata: () => [],
  switcher: false,
  toggleSwitcher: () => true || false,
  mobileMenu: false,
  setMobileMenu: () => null,
  appCookies: false,
  setAppCookies: () => true || false,
  setCookieNotice: () => true || false,
  joinButton: true,
  setJoinButton: () => null,
  locale: "en",
};

// app context
export const AppContext = createContext<AppContextProps>(defaultState);

export default AppContext;

export const useAppContext = () => useContext(AppContext);
