// import libs
import React from "react";

// import components
import { CalendarProvider } from "./calendar-provider";
import { TimePicker } from "./time-picker";
import { CalendarView } from "./calendar-view";

export const Calendar = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col h-screen">
        <TimePicker />
        <CalendarView />
      </div>
    </CalendarProvider>
  );
};
