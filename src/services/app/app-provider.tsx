// import libs
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import AppContext from "./app-context";
import { GeodataProps } from "../geolocation";
import { useCookies } from "react-cookie";

export interface AppContextProps {
  geodata?: Array<GeodataProps>;
  setGeodata?: Dispatch<SetStateAction<Array<GeodataProps>>>;
  switcher?: boolean;
  toggleSwitcher?: Dispatch<SetStateAction<boolean>>;
  appCookies?: boolean;
  setAppCookies?: Dispatch<SetStateAction<boolean>>;
  joinButton?: boolean;
  setJoinButton?: Dispatch<SetStateAction<boolean>>;
  setCookieNotice?: (value: boolean) => boolean;
  setPrayerFastButton?: (value: boolean) => boolean;
}

interface AppProviderProps extends AppContextProps {
  children: React.ReactNode;
}

// app provider
const AppProvider = ({ children }: AppProviderProps) => {
  // state
  const [geodata, setGeodata] = useState<Array<GeodataProps>>([]);
  const [switcher, toggleSwitcher] = useState<boolean>(false);
  const [appCookies, setAppCookies] = useState<boolean>(true);
  const [joinButton, setJoinButton] = useState<boolean>(true);

  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "gatsby-gdpr-google-analytics",
  ]);
  const [prayerFastCookie, setPrayerFastCookie, removePrayerFastCookie] =
    useCookies(["prayerfast-button"]);

  // set cookie notice
  const setCookieNotice = (value: boolean) => {
    if (value) {
      setCookie("gatsby-gdpr-google-analytics", true);
    } else {
      setCookie("gatsby-gdpr-google-analytics", false);
    }
    setAppCookies(true);
    return value;
  };

  // set prayerfast button
  const setPrayerFastButton = (value: boolean) => {
    if (value) {
      setPrayerFastCookie("prayerfast-button", true);
    }
    setAppCookies(true);
    return value;
  };

  useEffect(() => {
    if (cookies["gatsby-gdpr-google-analytics"] === undefined) {
      setAppCookies(false);
    } else {
      setAppCookies(true);
    }
  }, [appCookies]);

  useEffect(() => {
    if (prayerFastCookie["prayerfast-button"] === "true") {
      setJoinButton(false);
    }
  }, [prayerFastCookie]);

  return (
    <AppContext.Provider
      value={{
        geodata,
        setGeodata,
        switcher,
        toggleSwitcher,
        appCookies,
        setAppCookies,
        setCookieNotice,
        joinButton,
        setJoinButton,
        setPrayerFastButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
