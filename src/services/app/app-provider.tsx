// import libs
import React, { useState, useEffect } from "react";
import AppContext, { defaultState } from "./app-context";
import { GeodataProps } from "../geolocation";
import { useCookies } from "react-cookie";

interface AppProviderProps {
  children: React.ReactNode;
  locale: string;
}

// app provider
const AppProvider = ({ children, locale }: AppProviderProps) => {
  // state
  const [geodata, setGeodata] = useState<Array<GeodataProps>>([]);
  const [switcher, toggleSwitcher] = useState<boolean>(defaultState.switcher);
  const [mobileMenu, setMobileMenu] = useState<boolean>(
    defaultState.mobileMenu
  );
  const [appCookies, setAppCookies] = useState<boolean>(
    defaultState.appCookies
  );
  const [joinButton, setJoinButton] = useState<boolean>(
    defaultState.joinButton
  );

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
        mobileMenu,
        setMobileMenu,
        appCookies,
        setAppCookies,
        setCookieNotice,
        joinButton,
        setJoinButton,
        setPrayerFastButton,
        locale,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
