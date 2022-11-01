// import libs
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/app";
import { CalendarProvider, useCalendarContext } from "../calendar";
import { DateTime } from "luxon";
import groupBy from "lodash/groupBy";
import axios from "axios";

// import components
import { CalendarStats } from "./calendar-stats";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { FaPrayingHands } from "react-icons/fa";

/**
 * Main Calendar Page View
 * @returns React.ReactNode
 */
export const Calendar2 = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col text-white h-screen">
        <CalendarStats />
        {/* <div className="px-10 py-16 md:px-10 md:py-16 bg-emerald-600 text-center grid grid-cols-2">
          <div>
            <h2 className="text-3xl mb-3">
              Choose a time of prayer and fasting
            </h2>
            <p className="text-base">
              Take a next step with PrayerFast by committing to regular times of
              prayer and fasting.
            </p>
          </div>

        </div> */}
        <div className="flex flex-col md:flex-row flex-grow md:h-4/5">
          <div className="md:h-full border-r border-gray-900 overflow-y-scroll w-full md:max-w-xs no-scrollbar flex-grow">
            <WeekPicker />
            <DayPicker />
          </div>
          <div className="md:h-full border-r border-gray-900 overflow-y-scroll no-scrollbar flex-grow">
            <TimePicker />
          </div>
          <div className="md:h-full border-r border-gray-900 overflow-y-scroll w-full md:max-w-xs no-scrollbar flex-grow">
            <FastPicker />
            <AddToCalendar />
          </div>
          {/* <div className="md:h-full border-r border-gray-900 overflow-y-scroll no-scrollbar flex-grow">
            <CalendarStats />
          </div> */}
        </div>
      </div>
    </CalendarProvider>
  );
};

/**
 * Week Picker
 */
const WeekPicker = () => {
  const { weeks } = useCalendarContext();

  return (
    <div className="p-5 md:p-10 md:pb-0">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={1} active={true} />
        <span>Pick a week</span>
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
              ? "bg-fuchsia-600 group-hover:bg-fuchsia-500"
              : "bg-gray-700 group-hover:bg-fuchsia-600")
          }
        >
          {week.value}
        </span>
        <span
          className={
            "px-3 py-1 rounded-tr-md rounded-br-md flex flex-row space-x-2 items-center " +
            (week.key === weekData
              ? "bg-fuchsia-500 group-hover:bg-fuchsia-400"
              : "bg-gray-600 group-hover:bg-fuchsia-500")
          }
        >
          <span>{totalDays}</span>
          <CalendarIcon className="h-[18px] w-[18px]" />
        </span>
      </button>
    </li>
  );
};

/**
 * Day Picker
 */
const DayPicker = () => {
  const { days, dayData, weekData, setDayData, calendar } =
    useCalendarContext();

  const calWeek = groupBy(calendar, "week");

  return (
    <div className="p-5 md:p-10">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={2} active={weekData ? true : false} />
        <span>Pick a Day</span>
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
                  "disabled:text-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed flex flex-row w-full rounded-md group"
                }
                onClick={() => setDayData(day.key)}
                disabled={weekData ? false : true}
              >
                <span
                  className={
                    "px-3 py-1 flex-grow rounded-tl-md rounded-bl-md text-left " +
                    (day.key === dayData
                      ? "bg-fuchsia-600 group-hover:bg-fuchsia-500"
                      : "bg-gray-700 group-hover:bg-fuchsia-600")
                  }
                >
                  {day.value}
                </span>
                <span
                  className={
                    "px-3 py-1 rounded-tr-md rounded-br-md flex flex-row space-x-2 items-center " +
                    (day.key === dayData
                      ? "bg-fuchsia-500 group-hover:bg-fuchsia-400"
                      : "bg-gray-600 group-hover:bg-fuchsia-500")
                  }
                >
                  <span>{timesCount}</span>
                  <ClockIcon className="h-[18px] w-[18px]" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * Time Picker
 */
const TimePicker = () => {
  const {
    weeks,
    days,
    weekData,
    dayData,
    timeData,
    setTimeData,
    calendar,
    hours,
  } = useCalendarContext();

  const { locale } = useAppContext();
  const [times, setTimes] = useState<any>([]);

  useEffect(() => {
    const calWeek = groupBy(calendar, "week");

    if (weekData && dayData) {
      const weekItem: any = weeks.find(
        (week) => week.key === parseInt(weekData)
      );
      const dayItem: any = days.find((day) => day.key === dayData);

      const calDays = groupBy(calWeek[weekItem.key], "day");
      const filteredTimes = calDays[dayItem.key] || [];

      setTimes(filteredTimes);
    }
  }, [calendar, weekData, dayData, timeData]);

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
      value: `${kdt.toLocaleString(DateTime.TIME_SIMPLE)}`,
      // value: `${kdt.toLocaleString(DateTime.TIME_SIMPLE)} ${kdt.toFormat(
      //   "ZZZZ"
      // )}`,
      datetime: kdt,
    });
  });

  options.sort((a: any, b: any) => {
    return a.datetime.toFormat("HHmm") - b.datetime.toFormat("HHmm");
  });

  const weekLabel = weeks.filter((week) => week.key === parseInt(weekData));
  const dayLabel = days.filter((day) => day.key === dayData);

  return (
    <div className="p-5 md:p-10 flex-grow">
      <h2 className="text-lg mb-5 flex justify-between items-center">
        <span className="flex flex-row items-center">
          <Step step={3} active={weekData && dayData ? true : false} />
          <span>Pick a Prayer Time</span>
        </span>
        {weekData && dayData && (
          <span className="text-sm italic text-gray-500">
            ({weekLabel[0].value}-{dayLabel[0].value})
          </span>
        )}
      </h2>
      <ul className="grid grid-cols-4 gap-2">
        {options.map((time: any) => {
          let timeExists: any = [];
          let timeObject: any;
          let timeCount: number = 0;
          if (times && times.length > 0) {
            timeExists = times.filter((item: any) => item.time === time.key);
            timeObject = timeExists.length > 0 ? timeExists[0] : null;
            timeCount = timeExists.length > 0 ? timeExists[0].count : 0;
          }

          return (
            <li key={time.key}>
              <button
                className={
                  "flex justify-between rounded-md group disabled:cursor-not-allowed w-full "
                }
                onClick={() => setTimeData(time.key)}
                disabled={dayData ? false : true}
              >
                <span
                  className={
                    "px-3 py-1 flex-grow text-left rounded-tl-md rounded-bl-md " +
                    " disabled:text-gray-500 " +
                    (time.key === timeData
                      ? "bg-fuchsia-600 "
                      : "bg-gray-700 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-gray-400 ") +
                    (dayData
                      ? time.key === timeData
                        ? "group-hover:bg-fuchsia-600 group-hover:text-white"
                        : "group-hover:bg-fuchsia-600 group-hover:text-white"
                      : "")
                  }
                >
                  {time.value}
                </span>
                <span
                  className={
                    "px-3 py-1 flex flex-row justify-end items-center rounded-tr-md rounded-br-md min-w-[5rem] " +
                    (time.key === timeData
                      ? "bg-fuchsia-500 "
                      : "bg-gray-600 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-gray-500 ") +
                    (dayData
                      ? time.key === timeData
                        ? "group-hover:bg-fuchsia-400 group-hover:text-white"
                        : "group-hover:bg-fuchsia-500 group-hover:text-white"
                      : "")
                  }
                >
                  <span className="mr-2">
                    {time.value === timeData ? timeCount + 1 : timeCount}
                  </span>
                  <FaPrayingHands className="h-[18px] w-[18px]" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * Fast Picker
 */
const FastPicker = () => {
  const { meals, mealData, setMealData, timeData, weekData, dayData } =
    useCalendarContext();

  return (
    <div className="p-5 md:p-10 md:pb-0 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step
          step={4}
          active={weekData && dayData && timeData ? true : false}
        />
        Pick a meal
      </h2>
      <select
        className={
          "select mb-3 w-full text-white border-0 disabled:bg-gray-600/50 disabled:text-gray-400 " +
          (mealData !== "" ? "bg-fuchsia-600" : "bg-gray-700")
        }
        onChange={(e) => setMealData(e.target.value)}
        disabled={timeData ? false : true}
        value={mealData}
      >
        <option value="">Select a meal</option>
        {meals.map((meal, midx) => {
          return (
            <option key={`meal-${midx}`} value={meal.key}>
              {meal.value}
            </option>
          );
        })}
      </select>
      <p className="text-sm italic text-gray-500">
        Would you like to choose a meal to fast from for the day?
      </p>
    </div>
  );
};

/**
 * Submit
 */
const AddToCalendar = () => {
  const { weekData, dayData, timeData, mealData, setTimeData } =
    useCalendarContext();
  const { updateCalendar } = useCalendarContext();
  const { setMealData } = useCalendarContext();

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("Add to calendar");

  useEffect(() => {
    if (submitting) {
      return setSubmitDisabled(true);
    }

    if (weekData && dayData && timeData) {
      setSubmitDisabled(false);
    }
  }, [submitting, weekData, dayData, timeData]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitLabel("Adding...");

    const data = {
      week: weekData,
      day: dayData,
      time: timeData,
      meal: mealData,
    };

    if (!weekData || !dayData || !timeData) {
      setSubmitting(false);
      setSubmitLabel("Add to calendar");
      return;
    }

    await axios
      .post("/api/add-to-calendar", {
        data: data,
      })
      .then((res) => {
        console.log(
          "calendar document: ",
          res.data.insertedId ? res.data.insertedId : res.data.acknowledge
        );
        updateCalendar(() => {
          setTimeData("");
          setSubmitting(false);
          setSubmitLabel("Add another time");
          setMealData("");
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="p-5 md:p-10 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step
          step={5}
          active={weekData && dayData && timeData ? true : false}
        />
        Last Step
      </h2>
      <button
        className="px-3 py-2 bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={async () => handleSubmit()}
        disabled={submitDisabled}
      >
        {submitLabel}
      </button>
    </div>
  );
};

/**
 * Step
 */
type StepProps = {
  step: number;
  active: boolean;
};
const Step = ({ step, active }: StepProps) => (
  <span
    className={
      "w-8 h-8 mr-3 rounded-full flex justify-center items-center " +
      (active ? "bg-emerald-600 text-white" : "bg-gray-600 text-gray-400")
    }
  >
    {step}
  </span>
);
