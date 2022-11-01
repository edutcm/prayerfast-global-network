// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";

export const CalendarStats = () => {
  const { statsMinutes, statsHours, statsDays, statsPrayerTimes, statsFasts } =
    useCalendarContext();

  const monthMinutes = 60 * 24 * 7 * 4;
  const monthHours = 24 * 7 * 4;
  const monthDays = 7 * 4;
  const monthFasts = 3 * 28;

  const [minP, setMinP] = useState((statsMinutes / monthMinutes) * 100);
  const [hourP, setHourP] = useState((statsHours / monthHours) * 100);
  const [dayP, setDayP] = useState((statsDays / monthDays) * 100);
  const [fastP, setFastP] = useState();

  useEffect(() => {
    const minPVal = (statsMinutes / monthMinutes) * 100;
    const hourPVal = (statsHours / monthHours) * 100;
    const dayPVal = (statsDays / monthDays) * 100;

    setMinP(minPVal);
    setHourP(hourPVal);
    setDayP(dayPVal);
  }, [statsMinutes, statsHours, statsDays]);

  type StatsBoxProps = {
    count: number;
    label: string;
    bg: string;
  };

  const StatsBox = ({ count, label, bg }: StatsBoxProps) => {
    return (
      <div
        className={`${bg} p-5 h-full text-center flex flex-col justify-center`}
      >
        <div className="text-3xl">{count}</div>
        <div>{label}</div>
      </div>
    );
  };

  return (
    <div className="text-white bg-emerald-500 grid grid-cols-7 items-center">
      <div className="bg-emerald-500 col-span-3 p-5 md:p-10 ">
        <h2 className="text-2xl mb-3">Join Us</h2>
        <p className="text-sm">
          Are you ready to join others in praying and fasting the PrayerFast
          prayer? Pick a week, day, and time to commit to prayer and fasting
          with people from all around the world.
        </p>
      </div>

      <StatsBox count={statsDays} label="Days" bg="bg-emerald-600" />
      <StatsBox count={statsHours} label="Hours" bg="bg-emerald-600" />
      <StatsBox
        count={statsPrayerTimes}
        label="Prayer Times"
        bg="bg-emerald-600"
      />
      <StatsBox count={statsFasts} label="Fast Times" bg="bg-emerald-600" />
    </div>
  );
};
