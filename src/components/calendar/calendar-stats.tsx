// import libs
import React from "react";
import { useCalendarContext } from "./calendar-context";

export const CalendarStats = () => {
  const { statsMinutes, statsHours, statsDays, statsSlots, statsPrayerTimes } =
    useCalendarContext();

  return (
    <div className="py-5 px-10 text-white flex justify-between bg-emerald-500">
      <div>Minutes: {statsMinutes}</div>
      <div>Hours: {statsHours}</div>
      <div>Days: {statsDays}</div>
      <div>Slots: {statsSlots}</div>
      <div>PrayerTimes: {statsPrayerTimes}</div>
    </div>
  );
};
