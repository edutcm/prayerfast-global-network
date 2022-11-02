// import libs
import React from "react";
import { CalendarProvider } from ".";

// import components
import { CalendarStats } from "./calendar-stats";
import { WeekPicker } from "./picker-week";
import { DayPicker } from "./picker-day";
import { TimePicker } from "./picker-time";
import { RepeatPicker } from "./picker-repeat";
import { FastPicker } from "./picker-fast";
import { AddToCalendar } from "./calendar-add";

export interface CalendarProps {
  lang: any;
}

export const Calendar = ({ lang }: CalendarProps) => {
  const { stats, week, day, time, repeat, fast, add } = lang;

  return (
    <CalendarProvider lang={lang}>
      <div className="flex flex-col text-white h-screen">
        <CalendarStats lang={stats} />
        <div className="flex flex-col lg:flex-row flex-grow md:h-4/5">
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 sm:gap-2 border-gray-900 w-full " +
              "md:gap-0 lg:h-full lg:overflow-y-scroll lg:border-r lg:grid-cols-1 lg:max-w-xs"
            }
          >
            <WeekPicker lang={week} />
            <DayPicker lang={day} />
          </div>
          <div className="lg:h-full border-r border-gray-900 lg:overflow-y-scroll no-scrollbar flex-grow">
            <TimePicker lang={time} />
          </div>
          <div className="lg:h-full lg:overflow-y-scroll w-full no-scrollbar flex-grow lg:max-w-xs">
            <RepeatPicker lang={repeat} />
            <FastPicker lang={fast} />
            <AddToCalendar lang={add} />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
};
