// import libs
import React, { useState } from "react";
import { checkIsClient } from "../../utils/client";
import axios from "axios";
import { useCalendarContext } from "./calendar-context";

/**
 * Time Picker Component
 * @returns React.ReactNode
 */
export const TimePicker = () => {
  const isClient = checkIsClient();

  const [weekData, setWeekData] = useState<any>(null);
  const [dayData, setDayData] = useState<any>(null);
  const [mealData, setMealData] = useState<any>(null);
  const [timeData, setTimeData] = useState<any>([]);

  const { days, weeks, hours, meals, updateCalendar } = useCalendarContext();

  const handleSubmit = async () => {
    if (!weekData) {
      console.error("missing week param");
      return;
    }

    if (!dayData) {
      console.error("missing day param");
      return;
    }

    if (timeData.length === 0) {
      console.error("missing times param");
      return;
    }

    // increment database count for week_day_time
    await timeData.forEach((time: string) => {
      // const key = `${weekData}_${dayData}_${time}`.replace(":", "_");
      axios
        .post("/api/add-to-calendar", {
          data: {
            week: weekData,
            day: dayData,
            time: time,
          },
        })
        .then((res) => {
          console.log("calendar document: ", res.data.insertedId);
          updateCalendar();
        });
    });

    // increment meal count
    if (mealData) {
      console.log(mealData);
    }
  };

  const handleHours = () => {
    if (isClient) {
      const checkboxHours = document.querySelectorAll(
        "input[name=hour]:checked"
      );
      let checkedTimes: any = [];
      checkboxHours.forEach((time) => {
        checkedTimes.push(time.getAttribute("value"));
      });

      setTimeData(checkedTimes);
    }
  };

  return (
    <div className="h-screen bg-emerald-700 p-5 flex justify-center items-center">
      <div className="w-full p-10">
        <h2 className="text-white mb-3">Choose a time of prayer and fasting</h2>

        <div className="space-x-3 mb-3 box-border">
          <select
            className="select bg-emerald-800 text-white"
            name="week"
            onChange={(e) => setWeekData(e.target.value)}
          >
            <option>Select a week of the month</option>
            {weeks.map((week, idx) => {
              return (
                <option key={`week-${idx}`} value={week.key}>
                  {week.value}
                </option>
              );
            })}
          </select>

          <select
            className="select bg-emerald-800 text-white"
            name="weekday"
            onChange={(e) => setDayData(e.target.value)}
          >
            <option>Select a day of the week</option>
            {days.map((day, idx) => {
              return (
                <option key={`day-${idx}`} value={day.key}>
                  {day.value}
                </option>
              );
            })}
          </select>

          <select
            className="select bg-emerald-800 text-white"
            onChange={(e) => setMealData(e.target.value)}
          >
            <option>Select a meal</option>
            {meals.map((meal, midx) => {
              return (
                <option key={`meal-${midx}`} value={meal.key}>
                  {meal.value}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-wrap w-full mb-3">
          {hours.map((hour, hidx) => {
            return (
              <div
                key={`hour-${hidx}`}
                className="w-1/4 md:w-1/6 text-xs mb-3 flex flex-row"
              >
                <label className="w-2/5 flex items-center">
                  <input
                    type="checkbox"
                    name="hour"
                    className="checkbox checkbox-xs checkbox-accent border-emerald-500 mr-1"
                    value={`${hour}:00`}
                    onChange={() => handleHours()}
                  />
                  {/* @ts-expect-error */}
                  <span className="text-emerald-300">{hour}:00</span>
                </label>
                <label className="w-2/5 flex items-center">
                  <input
                    type="checkbox"
                    name="hour"
                    className="checkbox checkbox-xs checkbox-accent border-emerald-500 mr-1"
                    value={`${hour}:30`}
                    onChange={() => handleHours()}
                  />
                  {/* @ts-expect-error */}
                  <span className="text-emerald-300">{hour}:30</span>
                </label>
              </div>
            );
          })}
        </div>

        <button
          className="btn btn-sm bg-emerald-600 hover:bg-emerald-500 rounded-md border-0"
          onClick={async () => handleSubmit()}
        >
          Add to calendar
        </button>
      </div>
    </div>
  );
};
