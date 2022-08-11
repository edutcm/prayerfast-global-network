// import libs
import React, { useContext, useState } from "react";
import { getLocationData } from "../../services/geolocation";
import { getLocalizedPath } from "../../services/locales";
import { navigate } from "gatsby";
import axios from "axios";

// import components
import { AppContext } from "../../services/app";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Scoreboard from "../scoreboard";

interface CommitButtonProps {
  image: IGatsbyImageData;
  joinLabel: string;
  joinContent: string;
  joinDisclaimer: string;
  resourceLabel: string;
  about: string;
  people: string;
  languages: string;
  cities: string;
  countries: string;
  timezones: string;
  locale: string;
}

// toggle arrow component
const Toggle = ({ active }: { active: boolean }) => {
  const className = active
    ? "h-5 w-5 mr-6 ml-4 text-slate-800 bg-emerald-500 rounded-full flex-shrink-0"
    : "h-5 w-5 mr-6 ml-4 text-green-500 bg-slate-700 rounded-full flex-shrink-0";

  if (active) {
    return <ChevronDownIcon className={className} />;
  } else {
    return <ChevronRightIcon className={className} />;
  }
};

// commit button component
export const CommitButton = ({
  image,
  joinLabel,
  joinContent,
  joinDisclaimer,
  resourceLabel,
  about,
  people,
  languages,
  cities,
  countries,
  timezones,
  locale,
}: CommitButtonProps) => {
  const { appCookies, setPrayerFastButton, joinButton } =
    useContext(AppContext);

  const [join, toggleJoin] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const localImage = getImage(image);

  /**
   * Commit Button Click
   */
  const commitButtonClick = async () => {
    setDisabled(true);

    // get city-based result
    const locationData = await getLocationData();

    // insert location
    if (locationData) {
      await axios
        .post("/api/join", { geodata: locationData })
        .then((res) => {
          console.log(`upserted data with status ` + res.status);
        })
        .catch((err) => {
          console.log(err);
          alert("An error occurred. Please try again later.");
        });

      // set clicked prayerfast button cookie
      if (setPrayerFastButton) {
        setPrayerFastButton(true);
      }

      // navigate to resources page
      const navigateTo = getLocalizedPath("resources", locale);
      navigate(navigateTo);
      setDisabled(false);
    }
    // no location data
    else {
      alert("An error occurred. Please try again later.");
      setDisabled(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-end ${
        !appCookies
          ? "h-[calc(100vh-190px)] md:h-[calc(100vh-60px)]"
          : "h-[calc(100vh-100px)] md:h-screen"
      } w-full`}
    >
      <div className="relative z-[9900] w-[95%] md:w-4/5 md:m-5 lg:w-[44%]">
        {joinButton && (
          <div
            className="flex items-center justify-center w-full bg-slate-900/90 rounded-t-md rtl:rounded-t-md rtl:border-l rtl:border-r-0 cursor-pointer"
            onClick={() => {
              toggleJoin(!join);
            }}
          >
            <div className="text-white flex justify-between items-center h-16">
              {image && (
                <div className="pl-6 pr-4 h-16 flex items-center">
                  {localImage && (
                    <GatsbyImage
                      image={localImage}
                      alt={`PrayerFast Global Network`}
                      className="w-[40px]"
                    />
                  )}
                </div>
              )}
              <div className="text-lg h-16 flex items-center leading-tight text-white">
                {joinLabel}
              </div>

              <Toggle active={join} />
            </div>
          </div>
        )}

        {!joinButton && (
          <div
            className="flex items-center justify-center w-full bg-slate-900/90 rounded-t-md rtl:rounded-t-md rtl:border-l rtl:border-r-0 cursor-pointer"
            onClick={() => {
              // navigate to resources page
              const navigateTo = getLocalizedPath("resources", locale);
              navigate(navigateTo);
            }}
          >
            <div className="text-white flex justify-between items-center h-16">
              {image && (
                <div className="pl-6 pr-4 h-16 flex items-center">
                  {localImage && (
                    <GatsbyImage
                      image={localImage}
                      alt={`PrayerFast Global Network`}
                      className="w-[40px]"
                    />
                  )}
                </div>
              )}
              <div className="text-lg h-16 flex items-center leading-tight text-white">
                {resourceLabel}
              </div>

              <Toggle active={join} />
            </div>
          </div>
        )}

        {join && (
          <div className="bg-slate-900/95 p-6 text-white border-t border-slate-700">
            <div
              className="text-sm mb-6"
              dangerouslySetInnerHTML={{ __html: joinContent }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <button
                className="text-base px-4 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white leading-tight"
                onClick={async () => await commitButtonClick()}
                disabled={disabled}
              >
                {disabled && (
                  <div className="flex justify-center items-center text-white">
                    <div
                      style={{
                        borderTopColor: "transparent",
                      }}
                      className="w-7 h-7 border-4 border-white border-solid rounded-full animate-spin"
                    ></div>
                  </div>
                )}
                {!disabled && <>{joinLabel}</>}
              </button>
              <div className="text-xs italic text-slate-500">
                {joinDisclaimer}
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900/90 border-t border-slate-700 px-5 py-3 flex items-center justify-center cursor-default">
          <div className="text-emerald-200 text-sm text-center">{about}</div>
        </div>

        <div className="bg-slate-900/90 border-t border-slate-700 rounded-b-md width-full cursor-default">
          <Scoreboard
            people={people}
            languages={languages}
            cities={cities}
            countries={countries}
            timezones={timezones}
          />
          {/* {geodata && geodata.length > 0 && (
            <div className="text-center">
              <div className="text-xs md:text-xs text-slate-500 italic">
                {count.replace("{{count}}", totalPeople.toString())}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};