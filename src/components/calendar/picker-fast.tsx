// import libs
import React from "react";
import { useCalendarContext } from "./calendar-context";

// import libs
import { Step } from "./step";

export interface FastPickerProps {
  lang: any;
}

export const FastPicker = ({ lang }: FastPickerProps) => {
  const { meals, mealData, setMealData, timeData, weekData, dayData } =
    useCalendarContext();

  return (
    <div className="px-5 pt-10 md:p-10 md:pb-0 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step
          step={5}
          active={weekData && dayData && timeData ? true : false}
        />
        {lang.label}
      </h2>
      <select
        className={
          "select mb-3 w-full text-white border-0 disabled:bg-gray-600/50 disabled:text-gray-400 " +
          (mealData !== "" ? "bg-emerald-600" : "bg-gray-700")
        }
        onChange={(e) => setMealData(e.target.value)}
        disabled={timeData ? false : true}
        value={mealData}
      >
        <option value="">{lang.select}</option>
        {meals.map((meal, midx) => {
          return (
            <option key={`meal-${midx}`} value={meal.key}>
              {meal.value}
            </option>
          );
        })}
      </select>
      <p className="text-sm italic text-gray-500">{lang.hint}</p>
    </div>
  );
};
