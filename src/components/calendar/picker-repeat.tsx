// import libs
import React from "react";
import { useCalendarContext } from "./calendar-context";

// import components
import { Step } from "./step";

export interface RepeatPickerProps {
  lang: any;
}
export const RepeatPicker = ({ lang }: RepeatPickerProps) => {
  const { timeData, repeatOption, setRepeatOption } = useCalendarContext();

  return (
    <div className="px-5 pt-10 md:p-10 md:pb-0 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={4} active={timeData ? true : false} />
        {lang.label}
      </h2>
      <select
        // className={
        //   "select w-full text-white border-0 bg-emerald-600/50 disabled:bg-emerald-600/50 disabled:text-emerald-900"
        // }
        className={
          "select mb-3 w-full text-white border-0 disabled:bg-gray-600/50 disabled:text-gray-400 " +
          (repeatOption !== "" ? "bg-emerald-600" : "bg-gray-700")
        }
        onChange={(e) => {
          setRepeatOption(e.target.value);
        }}
        disabled={timeData ? false : true}
        value={repeatOption}
      >
        <option value="m">{lang.monthly}</option>
        <option value="b">{lang.biweekly}</option>
        <option value="w">{lang.weekly}</option>
      </select>
    </div>
  );
};
