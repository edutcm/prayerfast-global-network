// import libs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICalendarData, useCalendarContext } from "./calendar-context";
import { useAppContext } from "../../services/app";
import { DateTime } from "luxon";

/**
 * Time Picker Component
 * @returns React.ReactNode
 */
export const TimePicker = () => {
  const { locale } = useAppContext();

  const [weekData, setWeekData] = useState<string>("");
  const [dayData, setDayData] = useState<string>("");
  const [timeData, setTimeData] = useState<string>("");
  const [mealData, setMealData] = useState<string>("");
  const [repeatOption, setRepeatOption] = useState<string>("m");

  const [weekError, setWeekError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [s2Enabled, setS2Enabled] = useState(false);

  const { days, weeks, hours, meals, updateCalendar, setMyCalendar } =
    useCalendarContext();

  /**
   * Enable Section 2
   */
  useEffect(() => {
    if (weekData && dayData && timeData) {
      setS2Enabled(true);
    }
  }, [weekData, dayData, timeData]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitDisabled(true);

    if (!weekData) {
      setWeekError(true);
    }

    if (!dayData) {
      setDayError(true);
    }

    if (!timeData) {
      setTimeError(true);
    }

    if (!weekData || !dayData || !timeData) {
      setSubmitting(false);
      setSubmitDisabled(false);
      return;
    }

    let items: any = [];
    switch (repeatOption) {
      // monthly
      case "m":
        items.push({
          week: weekData,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        break;

      // bimonthly
      case "b":
        const w = parseInt(weekData) + 2;
        const week2 = w > 4 ? (w - 4).toString() : w.toString();
        items.push({
          week: weekData,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        items.push({
          week: week2,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        break;

      // weekly
      case "w":
        const loop: Number[] = [...Array(4).keys()];
        loop.forEach((l, idx) => {
          items.push({
            week: (idx + 1).toString(),
            day: dayData,
            time: timeData,
            meal: mealData,
          });
        });
        break;
    }

    setMyCalendar(items);

    // loop through items to add to calendar
    items.forEach(async (data: ICalendarData) => {
      await axios
        .post("/api/add-to-calendar", {
          data: data,
        })
        .then((res) => {
          console.log(
            "calendar document: ",
            res.data.insertedId ? res.data.insertedId : res.data.acknowledge
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    });

    updateCalendar();
    setSubmitting(false);
  };

  const resetForm = () => {
    // reset state
    setWeekData("");
    setDayData("");
    setMealData("");
    setTimeData("");

    setSubmitDisabled(false);
  };

  const TimeOptions = () => {
    let timeSlots: any = [];

    hours.forEach((hour) => {
      const leadingZero = hour < 10 ? "0" : "";
      timeSlots.push(`${leadingZero}${hour}:00`);
      timeSlots.push(`${leadingZero}${hour}:30`);
    });

    // datetime setup
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cdt = DateTime.local();
    const date = cdt.toFormat("y-MM-dd");
    let options: any = [];
    timeSlots.forEach((time: any) => {
      const dt = DateTime.fromISO(`${date}T${time}:00`, { zone: "utc" });
      const kdt = dt.setLocale(locale).setZone(timezone);

      options.push({
        key: time,
        value: `${kdt.toLocaleString(DateTime.TIME_SIMPLE)} ${kdt.toFormat(
          "ZZZZ"
        )}`,
        datetime: kdt,
      });
    });

    options.sort((a: any, b: any) => {
      return a.datetime.toFormat("HHmm") - b.datetime.toFormat("HHmm");
    });

    // console.log(options);
    return (
      <>
        {options.map((option: any) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </>
    );
  };

  return (
    <div className="h-screen bg-emerald-700 p-5 flex justify-center items-center">
      <div className="w-full max-w-3xl p-10">
        <h2 className="text-white mb-3">Choose a time of prayer and fasting</h2>

        <div className="space-x-3 mb-3 box-border flex flex-row">
          {/* Section 1 */}
          <div className="flex-grow">
            <select
              className={
                "select w-full text-white border-0 " +
                (weekError
                  ? "bg-amber-100 text-gray-800"
                  : "bg-emerald-600/50 disabled:bg-emerald-600/50 disabled:text-emerald-900")
              }
              name="week"
              onChange={(e) => {
                setWeekData(e.target.value);
                setWeekError(false);
              }}
              value={weekData}
              disabled={submitDisabled}
            >
              <option value="">Select a week</option>
              {weeks.map((week, idx) => {
                return (
                  <option key={`week-${idx}`} value={week.key}>
                    {week.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-grow">
            <select
              className={
                "select w-full text-white border-0 " +
                (dayError
                  ? "bg-amber-100 text-gray-800"
                  : "bg-emerald-600/50 disabled:bg-emerald-600/50 disabled:text-emerald-900")
              }
              name="weekday"
              onChange={(e) => {
                setDayData(e.target.value);
                setDayError(false);
              }}
              disabled={submitDisabled}
              value={dayData}
            >
              <option value="">Select a day</option>
              {days.map((day, idx) => {
                return (
                  <option key={`day-${idx}`} value={day.key}>
                    {day.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-grow">
            <select
              className={
                "select w-full text-white border-0 " +
                (timeError
                  ? "bg-amber-100 text-gray-800"
                  : "bg-emerald-600/50 disabled:bg-emerald-600/50  disabled:text-emerald-900")
              }
              onChange={(e) => {
                setTimeData(e.target.value);
                setTimeError(false);
              }}
              disabled={submitDisabled}
              value={timeData}
            >
              <option value="">Select a time</option>
              <TimeOptions />
            </select>
          </div>
        </div>

        {/* Section 2 */}
        {s2Enabled && (
          <div className="space-x-3 mb-3 box-border flex flex-row">
            <div className="flex-grow">
              <select
                className={
                  "select w-full text-white border-0 bg-emerald-600/50 disabled:bg-emerald-600/50 disabled:text-emerald-900"
                }
                onChange={(e) => {
                  setRepeatOption(e.target.value);
                }}
                disabled={submitDisabled}
                value={repeatOption}
              >
                <option value="m">Every month</option>
                <option value="b">Every other week</option>
                <option value="w">Weekly</option>
              </select>
            </div>

            <div className="flex-grow">
              <select
                className="select w-full bg-emerald-600/50 text-white border-0 disabled:bg-emerald-600/50 disabled:text-emerald-900"
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

            {!submitDisabled && s2Enabled && (
              <button
                className="btn btn-md bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0"
                onClick={async () => handleSubmit()}
                disabled={submitting}
              >
                Add to calendar
              </button>
            )}

            {submitDisabled && s2Enabled && (
              <button
                className="btn btn-md bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0"
                onClick={async () => resetForm()}
              >
                Add more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
