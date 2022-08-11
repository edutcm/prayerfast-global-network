// import libs
import React, { useContext } from "react";
import { useLocation } from "@reach/router";
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies";

// import components
import { AppContext } from "../../services/app";
import { Link } from "gatsby";

// props
interface CookieConsentProps {
  cookieName: string;
}

const CookieConsent = ({ cookieName }: CookieConsentProps) => {
  const { setCookieNotice } = useContext(AppContext);

  // location
  const location = useLocation();

  const acceptCookies = () => {
    setCookieNotice(true);
    initializeAndTrack(location);
  };

  const declineCookies = () => {
    setCookieNotice(false);
  };

  return (
    <div className="grid grid-cols-7 gap-5 bg-slate-700 text-white w-full h-[100px] md:h-[60px] px-4">
      <div className="col-span-4 md:col-span-6 flex items-center">
        <p className="text-sm">
          We uses cookies to analyze our website traffic.{" "}
          <Link
            className="text-emerald-200 hover:text-emerald-300"
            to="/en/cookies"
          >
            Our Cookie Policy.
          </Link>
        </p>
      </div>
      <div className="col-span-3 md:col-span-1 flex items-center justify-end">
        <button
          onClick={() => acceptCookies()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-3 rounded-l-sm text-xs"
        >
          Accept
        </button>
        <button
          onClick={() => declineCookies()}
          className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 py-1 px-3 rounded-r-sm text-xs"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
