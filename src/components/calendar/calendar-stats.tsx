// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";

export const CalendarStats = () => {
  const {
    statsMinutes,
    statsHours,
    statsDays,
    statsPrayerTimes,
    statsFasts,
    calendar,
  } = useCalendarContext();

  const [statsSet, setStatsSet] = useState(false);
  const [oMinutes, setOMinutes] = useState(statsMinutes);
  const [oHours, setOHours] = useState(statsHours);
  const [oDays, setODays] = useState(statsDays);
  const [oPrayerTimes, setOPrayerTimes] = useState(statsPrayerTimes);
  const [oFasts, setOFasts] = useState(statsFasts);

  useEffect(() => {
    if (
      !statsSet &&
      statsMinutes &&
      statsHours &&
      statsDays &&
      statsPrayerTimes &&
      statsFasts
    ) {
      setStatsSet(true);
      setOMinutes(statsMinutes);
      setOHours(statsHours);
      setODays(statsDays);
      setOPrayerTimes(statsPrayerTimes);
      setOFasts(statsFasts);
    }
  }, [statsMinutes, statsHours, statsDays, statsPrayerTimes, statsFasts]);

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
  };

  const StatsBox = ({ count, oCount, label }: StatsBoxProps) => {
    return (
      <div
        className={`${
          count === oCount
            ? "bg-emerald-600 text-emerald-200"
            : "bg-emerald-700 text-white"
        } p-5 h-full text-center flex flex-col justify-start md:justify-center transition-all duration-200 ease-in-out`}
      >
        <div className="text-2xl md:text-3xl">{count}</div>
        <div className="text-md">{label}</div>
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
      <div className="bg-emerald-500 col-span-3 p-5 md:p-10 ">
        <h2 className="text-xl md:text-2xl mb-3">Join Us</h2>
        <p className="text-sm md:text-md">
          Pick a week, day, and time to commit to prayer and fasting with people
          from all around the world.
        </p>
      </div>

      <div className="col-span-4 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 h-full">
        <StatsBox count={statsDays} oCount={oDays} label="Days" />
        <StatsBox count={statsHours} oCount={oHours} label="Hours" />
        <StatsBox
          count={statsPrayerTimes}
          oCount={oPrayerTimes}
          label="Prayer Times"
        />
        <StatsBox count={statsFasts} oCount={oFasts} label="Fast Times" />
      </div>
    </div>
  );
};
