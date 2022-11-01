// import libs
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/app";
import { CalendarProvider, useCalendarContext } from "../calendar";
import { DateTime } from "luxon";
import groupBy from "lodash/groupBy";
import axios from "axios";

// import components
import { CalendarStats } from "./calendar-stats";
import { UserIcon, UserGroupIcon } from "@heroicons/react/outline";
/**
 * Main Calendar Page View
 * @returns React.ReactNode
 */
export const Calendar2 = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col text-white h-screen">
        <div className="p-5 md:px-10 md:py-16 bg-emerald-600 h-1/5">
          <h2 className="text-2xl mb-3">Choose a time of prayer and fasting</h2>
          <p className="text-base">
            Take a next step with PrayerFast by committing to regular times of
            prayer and fasting.
          </p>
        </div>
        <div className="flex flex-row flex-grow h-4/5">
          <div className="md:h-full border-r border-slate-900 overflow-y-scroll w-full md:max-w-xs no-scrollbar flex-grow">
            <WeekPicker />
            <DayPicker />
          </div>
          <div className="md:h-full border-r border-slate-900 overflow-y-scroll w-full md:max-w-lg no-scrollbar flex-grow">
            <TimePicker />
          </div>
          <div className="md:h-full border-r border-slate-900 overflow-y-scroll w-full md:max-w-xs no-scrollbar flex-grow">
            <FastPicker />
            <AddToCalendar />
          </div>
          <div className="md:h-full border-r border-slate-900 overflow-y-scroll no-scrollbar flex-grow">
            <CalendarStats />
          </div>
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
    <div className="p-5 md:p-10">
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
  const { weekData, setWeekData } = useCalendarContext();

  return (
    <li>
      <button
        className={"border-0 outline-0 flex flex-row group min-w-[70%]"}
        onClick={() => setWeekData(week.key)}
      >
        <span
          className={
            "px-3 py-1 flex-grow rounded-tl-md rounded-bl-md text-left " +
            (week.key === weekData
              ? "bg-emerald-600 group-hover:bg-emerald-500"
              : "bg-slate-700 group-hover:bg-emerald-600")
          }
        >
          {week.value}
        </span>
        <span
          className={
            "px-3 py-1 rounded-tr-md rounded-br-md " +
            (week.key === weekData
              ? "bg-emerald-500 group-hover:bg-emerald-400"
              : "bg-slate-600 group-hover:bg-emerald-500")
          }
        >
          0
        </span>
      </button>
    </li>
  );
};

/**
 * Day Picker
 */
const DayPicker = () => {
  const { days, dayData, weekData, setDayData } = useCalendarContext();

  return (
    <div className="p-5 md:p-10">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step step={2} active={weekData ? true : false} />
        <span>Pick a Day</span>
      </h2>
      <ul className="space-y-2">
        {days.map((day) => {
          return (
            <li key={day.key}>
              <button
                className={
                  "disabled:text-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed flex flex-row min-w-[70%] rounded-md"
                }
                onClick={() => setDayData(day.key)}
                disabled={weekData ? false : true}
              >
                <span
                  className={
                    "px-3 py-1 flex-grow rounded-tl-md rounded-bl-md text-left " +
                    (day.key === dayData
                      ? "bg-emerald-600 group-hover:bg-emerald-500"
                      : "bg-slate-700 group-hover:bg-emerald-600")
                  }
                >
                  {day.value}
                </span>
                <span
                  className={
                    "px-3 py-1 rounded-tr-md rounded-br-md " +
                    (day.key === dayData
                      ? "bg-emerald-500 group-hover:bg-emerald-400"
                      : "bg-slate-600 group-hover:bg-emerald-500")
                  }
                >
                  0
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
  }, [calendar, weekData, dayData]);

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
          <span className="text-sm italic text-slate-500">
            ({weekLabel[0].value}-{dayLabel[0].value})
          </span>
        )}
      </h2>
      <ul className="grid grid-cols-2 gap-2">
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
                    " disabled:text-slate-500 " +
                    (time.key === timeData
                      ? "bg-emerald-600 "
                      : "bg-slate-700 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-slate-400 ") +
                    (dayData
                      ? time.key === timeData
                        ? "group-hover:bg-emerald-600 group-hover:text-white"
                        : "group-hover:bg-emerald-600 group-hover:text-white"
                      : "")
                  }
                >
                  {time.value}
                </span>
                <span
                  className={
                    "px-3 py-1 flex flex-row justify-end items-center rounded-tr-md rounded-br-md min-w-[5rem] " +
                    (time.key === timeData
                      ? "bg-emerald-700 "
                      : "bg-slate-900/70 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-slate-700 ") +
                    (dayData
                      ? time.key === timeData
                        ? "group-hover:bg-emerald-800 group-hover:text-white"
                        : "group-hover:bg-emerald-700 group-hover:text-white"
                      : "")
                  }
                >
                  <span className="mr-2">
                    {time.value === timeData ? timeCount + 1 : timeCount}
                  </span>
                  {timeCount <= 1 && <UserIcon className="h-[18px] w-[18px]" />}
                  {timeObject && timeObject.count > 1 && (
                    <UserGroupIcon className="h-[18px] w-[18px]" />
                  )}
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
    <div className="p-5 md:p-10 flex-grow">
      <h2 className="text-lg mb-3 flex flex-row items-center">
        <Step
          step={4}
          active={weekData && dayData && timeData ? true : false}
        />
        Pick a meal
      </h2>
      <p className="text-sm italic mb-3">
        Would you like to choose a meal to fast from for the day?
      </p>
      <select
        className={
          "select w-full text-white border-0 disabled:bg-slate-600/50 disabled:text-slate-400 " +
          (mealData !== "" ? "bg-emerald-600" : "bg-slate-700")
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
    </div>
  );
};

/**
 * Submit
 */
const AddToCalendar = () => {
  const { weekData, dayData, timeData, mealData } = useCalendarContext();
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
      <h2 className="text-lg mb-3 flex flex-row items-center">
        <Step
          step={5}
          active={weekData && dayData && timeData ? true : false}
        />
        Last Step
      </h2>
      <p className="text-sm italic mb-3">
        Are you ready to join others in praying and fasting the PrayerFast
        prayer?
      </p>

      <button
        className="px-3 py-2 bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
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
      (active ? "bg-emerald-600 text-white" : "bg-slate-600 text-slate-400")
    }
  >
    {step}
  </span>
);
