// import libs
import React from "react";
import { useCalendarContext } from "./calendar-context";
import groupBy from "lodash/groupBy";

// import components
import { Step } from "./step";
import { CalendarIcon } from "@heroicons/react/outline";

export interface WeekPickerProps {
  lang: any;
}

export const WeekPicker = ({ lang }: WeekPickerProps) => {
  const { weeks } = useCalendarContext();

  return (
    <div className="px-5 pt-10 md:pl-10 md:pr-0 lg:p-10 lg:pb-0">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={1} active={true} />
        <span>{lang.label}</span>
      </h2>
      {/* <p className="text-base mb-5">You can pick multiple weeks.</p> */}
      <ul className="space-y-2">
        {weeks.map((week) => (
          <WeekBox key={week.key} week={week} />
        ))}
      </ul>
    </div>
  );
};

type WeekBoxProps = {
  week: any;
};

const WeekBox = ({ week }: WeekBoxProps) => {
  const { weekData, setWeekData, calendar } = useCalendarContext();

  const calWeek = groupBy(calendar, "week");
  const calDays = groupBy(calWeek[week.key], "day");
  const totalDays = Object.keys(calDays).length;

  return (
    <li>
      <button
        className={"border-0 outline-0 flex flex-row group w-full"}
        onClick={() => setWeekData(week.key)}
      >
        <span
          className={
            "px-3 py-1 flex-grow rounded-tl-md rounded-bl-md text-left " +
            (week.key === weekData
              ? "bg-emerald-600 group-hover:bg-emerald-500"
              : "bg-gray-700 group-hover:bg-emerald-600")
          }
        >
          {week.value}
        </span>
        <span
          className={
            "px-3 py-1 rounded-tr-md rounded-br-md flex flex-row space-x-2 items-center " +
            (week.key === weekData
              ? "bg-emerald-500 group-hover:bg-emerald-400"
              : "bg-gray-600 group-hover:bg-emerald-500")
          }
        >
          <span>{totalDays}</span>
          <CalendarIcon className="h-[18px] w-[18px]" />
        </span>
      </button>
    </li>
  );
};
