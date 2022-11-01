// import libs
import React from "react";

// import components
import { CalendarProvider } from "./calendar-provider";
import { TimePicker } from "./time-picker";
import { CalendarView } from "./calendar-view";
import { CalendarStats } from "./calendar-stats";

export const Calendar = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-row h-screen flex-wrap">
        <TimePicker />
        <CalendarStats />
        <div className="flex flex-row flex-grow flex-wrap">
          <CalendarView />
        </div>
      </div>
    </CalendarProvider>
  );
};
