// import libs
import React from "react";
import { useCalendarContext } from "./calendar-context";
import groupBy from "lodash/groupBy";

// import libs
import { Step } from "./step";
import { ClockIcon } from "@heroicons/react/outline";
import { Radial } from "./radial";

export interface DayPickerProps {
  lang: any;
}

export const DayPicker = ({ lang }: DayPickerProps) => {
  const { days, dayData, weekData, setDayData, calendar } =
    useCalendarContext();

  const calWeek = groupBy(calendar, "week");

  return (
    <div className="px-5 pt-10 md:pl-0 md:pr-10 lg:p-10 lg:pt-0">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={2} active={weekData ? true : false} />
        <span>{lang.label}</span>
      </h2>
      <ul className="space-y-2">
        {days.map((day) => {
          const calDays = groupBy(calWeek[weekData], "day");
          let timesCount: number = 0;

          if (calDays[day.key]) {
            timesCount = calDays[day.key].length;
          }

          return (
            <li key={day.key}>
              <button
                className={
                  "disabled:text-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed " +
                  "flex flex-row w-full rounded-md group"
                }
                onClick={() => setDayData(day.key)}
                disabled={weekData ? false : true}
              >
                <div
                  className={
                    "px-3 py-1 flex-grow rounded-tl-md rounded-bl-md text-left group-disabled:bg-gray-700 " +
                    (day.key === dayData
                      ? "bg-emerald-600 group-hover:bg-emerald-500"
                      : "bg-gray-700 group-hover:bg-emerald-600")
                  }
                >
                  {day.value}
                </div>
                <div
                  className={
                    "px-3 rounded-tr-md rounded-br-md flex flex-row items-center justify-center group-disabled:bg-gray-600 h-8 leading-5 " +
                    (day.key === dayData
                      ? "bg-emerald-500 group-hover:bg-emerald-400"
                      : "bg-gray-600 group-hover:bg-emerald-500")
                  }
                >
                  <Radial percentage={(timesCount / 48) * 100} />
                </div>
                {/* <span
                  className={
                    "px-3 py-1 rounded-tr-md rounded-br-md flex flex-row space-x-2 items-center group-disabled:bg-gray-600 " +
                    (day.key === dayData
                      ? "bg-emerald-500 group-hover:bg-emerald-400"
                      : "bg-gray-600 group-hover:bg-emerald-500")
                  }
                >
                  <span>{timesCount}</span>
                  <ClockIcon className="h-[18px] w-[18px]" />
                </span> */}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
