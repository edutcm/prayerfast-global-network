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

  const [weekData, setWeekData] = useState<any>("");
  const [dayData, setDayData] = useState<any>("");
  const [mealData, setMealData] = useState<any>("");
  const [timeData, setTimeData] = useState<any>([]);

  const [weekError, setWeekError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { days, weeks, hours, meals, updateCalendar, setMyCalendar } =
    useCalendarContext();

  const handleSubmit = async () => {
    setSubmitting(true);

    if (!weekData) {
      setWeekError(true);
    }

    if (!dayData) {
      setDayError(true);
    }

    if (timeData.length === 0) {
      setTimeError(true);
    }

    if (!weekData || !dayData || timeData.length === 0) {
      setSubmitting(false);
      return;
    }

    setMyCalendar(weekData, dayData, timeData);

    // increment database count for week_day_time
    await timeData.forEach(async (time: string) => {
      const data = {
        week: weekData,
        day: dayData,
        time: time,
      };

      await axios
        .post("/api/add-to-calendar", {
          data: data,
        })
        .then((res) => {
          console.log("calendar document: ", res.data.insertedId);
        });
    });

    // increment meal count
    if (mealData) {
      console.log(mealData);
    }

    updateCalendar();

    setSubmitDisabled(true);
    setSubmitting(false);
  };

  const handleHours = () => {
    setTimeError(false);
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

  const resetForm = () => {
    // reset state
    setWeekData("");
    setDayData("");
    setMealData("");

    // reset dom
    if (isClient) {
      document
        .querySelectorAll("input[name=hour]")
        // @ts-expect-error
        .forEach((el) => (el.checked = false));
    }

    setSubmitDisabled(false);
  };

  return (
    <div className="h-screen bg-emerald-700 p-5 flex justify-center items-center">
      <div className="w-full p-10">
        <h2 className="text-white mb-3">Choose a time of prayer and fasting</h2>

        <div className="space-x-3 mb-3 box-border flex flex-row">
          <div>
            <select
              className={
                "select  text-white border-0 " +
                (weekError
                  ? "bg-red-700"
                  : "bg-emerald-600 disabled:bg-emerald-600 disabled:text-emerald-900")
              }
              name="week"
              onChange={(e) => {
                setWeekData(e.target.value);
                setWeekError(false);
              }}
              value={weekData}
              disabled={submitDisabled}
            >
              <option value="">Select a week of the month</option>
              {weeks.map((week, idx) => {
                return (
                  <option key={`week-${idx}`} value={week.key}>
                    {week.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <select
              className={
                "select  text-white border-0 " +
                (dayError
                  ? "bg-red-700"
                  : "bg-emerald-600 disabled:bg-emerald-600 disabled:text-emerald-900")
              }
              name="weekday"
              onChange={(e) => {
                setDayData(e.target.value);
                setDayError(false);
              }}
              disabled={submitDisabled}
              value={dayData}
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
          </div>

          <div>
            <select
              className="select bg-emerald-600 text-white border-0 disabled:bg-emerald-600 disabled:text-emerald-900"
              onChange={(e) => setMealData(e.target.value)}
              disabled={submitDisabled}
              value={mealData}
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
                    className={
                      "checkbox checkbox-xs checkbox-accent mr-1 " +
                      (timeError
                        ? "border-white bg-red-500"
                        : "border-emerald-300")
                    }
                    value={`${hour}:00`}
                    onChange={() => handleHours()}
                    disabled={submitDisabled}
                  />
                  {/* @ts-expect-error */}
                  <span
                    className={timeError ? "text-red-200" : "text-emerald-300"}
                  >
                    {hour}:00
                  </span>
                </label>
                <label className="w-2/5 flex items-center">
                  <input
                    type="checkbox"
                    name="hour"
                    className={
                      "checkbox checkbox-xs checkbox-accent mr-1 " +
                      (timeError
                        ? "border-white bg-red-500"
                        : "border-emerald-300")
                    }
                    value={`${hour}:30`}
                    onChange={() => handleHours()}
                    disabled={submitDisabled}
                  />
                  {/* @ts-expect-error */}
                  <span
                    className={timeError ? "text-red-200" : "text-emerald-300"}
                  >
                    {hour}:30
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {!submitDisabled && (
          <button
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-500 rounded-md border-0"
            onClick={async () => handleSubmit()}
            disabled={submitting}
          >
            Add to calendar
          </button>
        )}

        {submitDisabled && (
          <button
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-500 rounded-md border-0"
            onClick={async () => resetForm()}
          >
            Add more
          </button>
        )}
      </div>
    </div>
  );
};
