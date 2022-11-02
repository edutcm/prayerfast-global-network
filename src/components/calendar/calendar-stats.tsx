// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";
import { convertToBgImage } from "gbimage-bridge";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";

// import components
import BackgroundImage from "gatsby-background-image";
export interface CalendarStatsProps {
  lang: any;
  image: IGatsbyImageData;
}

export const CalendarStats = ({ lang, image }: CalendarStatsProps) => {
  const localImage = getImage(image);
  const bgImage = convertToBgImage(localImage);

  const { statsHours, statsDays, statsPrayerTimes, statsFasts } =
    useCalendarContext();

  const [statsSet, setStatsSet] = useState(false);
  const [oHours, setOHours] = useState(statsHours);
  const [oDays, setODays] = useState(statsDays);
  const [oPrayerTimes, setOPrayerTimes] = useState(statsPrayerTimes);
  const [oFasts, setOFasts] = useState(statsFasts);

  useEffect(() => {
    if (
      !statsSet &&
      statsHours &&
      statsDays &&
      statsPrayerTimes &&
      statsFasts
    ) {
      setStatsSet(true);
      setOHours(statsHours);
      setODays(statsDays);
      setOPrayerTimes(statsPrayerTimes);
      setOFasts(statsFasts);
    }
  }, [statsHours, statsDays, statsPrayerTimes, statsFasts]);

  // const monthMinutes = 60 * 24 * 7 * 4;
  // const monthHours = 24 * 7 * 4;
  // const monthDays = 7 * 4;
  // const monthFasts = 3 * 28;

  // useEffect(() => {
  //   // const minPVal = (statsMinutes / monthMinutes) * 100;
  //   // const hourPVal = (statsHours / monthHours) * 100;
  //   // const dayPVal = (statsDays / monthDays) * 100;
  //   // setMinP(minPVal);
  //   // setHourP(hourPVal);
  //   // setDayP(dayPVal);
  // }, [statsMinutes, statsHours, statsDays]);

  type StatsBoxProps = {
    count: number;
    oCount: number;
    label: string;
    percentage: number;
  };

  const StatsBox = ({ count, oCount, label, percentage }: StatsBoxProps) => {
    return (
      <div
        className={`text-center flex flex-col justify-start md:justify-center items-center transition-all duration-200 ease-in-out`}
      >
        <div className="relative">
          <div
            className="radial-progress mb-3 relative z-20 text-emerald-300"
            style={{
              // @ts-expect-error
              "--value": percentage > 97 ? 97 : percentage,
              "--size": "5rem",
              "--thickness": "4px",
            }}
          ></div>
          <div
            className={
              "top-0 left-0 absolute flex justify-center items-center w-[5rem] h-[5rem] rounded-full border-4 z-10 " +
              (count === oCount
                ? "border-emerald-700"
                : "border-emerald-600/50")
            }
          >
            {percentage === 100 ? percentage : percentage.toFixed(1)}%
          </div>
        </div>
        <div>
          {/* <div className="text-xl md:text-xl">{count}</div> */}
          <div className="text-xs uppercase">
            {count} {label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BackgroundImage {...bgImage}>
      <div
        className={
          "bg-gray-900/[85%] text-white grid grid-cols-1 md:grid-cols-7 pt-20 px-5 md:px-10"
        }
      >
        <div className="md:col-span-2 md:h-full flex flex-col items-center justify-center text-center md:text-left md:items-start">
          <h2 className="text-xl md:text-2xl mb-3">{lang.title}</h2>
          <p className="text-sm md:text-md">{lang.description}</p>
        </div>

        <div className=" px-5 py-10 md:col-span-5 grid gap-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:h-full">
          <StatsBox
            count={statsDays}
            oCount={oDays}
            label={lang.days}
            percentage={(statsDays / 28) * 100}
          />
          <StatsBox
            count={statsHours}
            oCount={oHours}
            label={lang.hours}
            percentage={(statsHours / (24 * 28)) * 100}
          />
          <StatsBox
            count={statsPrayerTimes}
            oCount={oPrayerTimes}
            label={lang.prayer_times}
            percentage={(statsPrayerTimes / (48 * 28)) * 100}
          />
          <StatsBox
            count={statsFasts}
            oCount={oFasts}
            label={lang.fast_times}
            percentage={(statsFasts / (3 * 28)) * 100}
          />
        </div>
      </div>
    </BackgroundImage>
  );
};
