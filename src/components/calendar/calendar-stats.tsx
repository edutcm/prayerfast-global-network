// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";

export const CalendarStats = () => {
  const { statsMinutes, statsHours, statsDays, statsPrayerTimes, statsFasts } =
    useCalendarContext();

  const monthMinutes = 60 * 24 * 7 * 4;
  const monthHours = 24 * 7 * 4;
  const monthDays = 7 * 4;

  const [minP, setMinP] = useState((statsMinutes / monthMinutes) * 100);
  const [hourP, setHourP] = useState((statsHours / monthHours) * 100);
  const [dayP, setDayP] = useState((statsDays / monthDays) * 100);

  useEffect(() => {
    const minPVal = (statsMinutes / monthMinutes) * 100;
    const hourPVal = (statsHours / monthHours) * 100;
    const dayPVal = (statsDays / monthDays) * 100;

    setMinP(minPVal);
    setHourP(hourPVal);
    setDayP(dayPVal);
  }, [statsMinutes, statsHours, statsDays]);

  return (
    <div className="py-5 px-24 text-white bg-slate-800 flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl mb-3">Join Us</h2>
      <p className="mb-16 text-sm">
        Help us cover each month with 24/7 prayer.
      </p>
      <div className="flex justify-center items-center space-x-16">
        <div className="space-y-1 text-md">
          <div className="text-fuchsia-400">{statsDays} Days</div>
          <div className="text-sky-400">{statsHours} Hours</div>
          <div className="text-emerald-400">{statsMinutes} Minutes</div>
          <div className="text-slate-400">{statsPrayerTimes} Prayer Times</div>
          <div className="text-slate-400">{statsFasts} Fasts</div>
        </div>

        <div className="min-w-[10rem] relative">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div
              className="radial-progress text-emerald-500"
              style={{
                // @ts-expect-error
                "--value": minP,
                "--size": "5rem",
                "--thickness": "0.75rem",
              }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div
              className="radial-progress text-sky-600"
              style={{
                // @ts-expect-error
                "--value": hourP,
                "--size": "7.5rem",
                "--thickness": "0.75rem",
              }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div
              className="radial-progress text-fuchsia-600"
              style={{
                // @ts-expect-error
                "--value": dayP,
                "--size": "10rem",
                "--thickness": "0.75rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
