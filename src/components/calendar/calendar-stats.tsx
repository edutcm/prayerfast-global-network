// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";

export interface CalendarStatsProps {
  lang: any;
}

export const CalendarStats = ({ lang }: CalendarStatsProps) => {
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
        className={`${
          count === oCount
            ? "bg-emerald-600 text-emerald-200"
            : "bg-emerald-700 text-white"
        } p-5 h-full text-center flex flex-col justify-start md:justify-center items-center transition-all duration-200 ease-in-out`}
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
    <div
      className={
        "text-white bg-emerald-500 grid grid-cols-1 items-center " +
        "md:grid-cols-7"
      }
    >
      <div className="bg-emerald-500 col-span-2 p-5 md:p-10 ">
        <h2 className="text-xl md:text-2xl mb-3">{lang.title}</h2>
        <p className="text-sm md:text-md">{lang.description}</p>
      </div>

      <div className="col-span-5 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 h-full">
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
  );
};
