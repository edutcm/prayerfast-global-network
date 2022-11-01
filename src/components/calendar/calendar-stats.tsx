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
      <div className={`${bg} p-5 rounded-md text-center`}>
        <div className="text-3xl">{count}</div>
        <div>{label}</div>
      </div>
    );
  };

  return (
    <div className="p-5 md:p-10 text-white bg-slate-800 flex flex-col justify-start items-center flex-grow box-border">
      <h2 className="text-2xl mb-3">Join Us</h2>

      <p className="mb-5 md:mb-10 text-sm text-center">
        Are you ready to join others in praying and fasting the PrayerFast
        prayer?
      </p>

      <div className="grid grid-cols-2 w-full gap-3">
        <StatsBox count={statsDays} label="Days" bg="bg-emerald-700" />
        <StatsBox count={statsHours} label="Hours" bg="bg-emerald-500" />
        <StatsBox
          count={statsPrayerTimes}
          label="Prayer Times"
          bg="bg-emerald-500"
        />
        <StatsBox count={statsFasts} label="Fast Times" bg="bg-emerald-700" />
      </div>

      {/* <div className="flex justify-center items-center space-x-16">
        <div className="space-y-1 text-xs">
          <div className="text-fuchsia-400">{statsDays} Days</div>
          <div className="text-sky-400">{statsHours} Hours</div>
          <div className="text-emerald-400">{statsMinutes} Minutes</div>
          <div className="text-slate-400">{statsPrayerTimes} Prayer Times</div>
          <div className="text-slate-400">{statsFasts} Meals Fasted</div>
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
      </div> */}
    </div>
  );
};
