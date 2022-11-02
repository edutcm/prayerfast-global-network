// import libs
import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./calendar-context";
import { useAppContext } from "../../services/app";
import groupBy from "lodash/groupBy";
import { DateTime } from "luxon";

// import components
import { Step } from "./step";
import { FaPrayingHands } from "react-icons/fa";

export interface TimePickerProps {
  lang: any;
}
export const TimePicker = ({ lang }: TimePickerProps) => {
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
  const [options, setOptions] = useState<any>([]);
  const [weekLabel, setWeekLabel] = useState("");
  const [dayLabel, setDayLabel] = useState("");

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
    } else {
      setTimes([]);
    }
  }, [calendar, weekData, dayData, timeData]);

  useEffect(() => {
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

    setOptions(options);

    const weekLabel = weeks.filter((week) => week.key === parseInt(weekData));
    const dayLabel = days.filter((day) => day.key === dayData);

    if (weekLabel.length > 0) {
      setWeekLabel(weekLabel[0].value);
    }

    if (dayLabel.length > 0) {
      setDayLabel(dayLabel[0].value);
    }
  }, [weekData, dayData, timeData]);

  return (
    <div className="px-5 pt-10 md:p-10 md:pb-0 lg:pb-10 flex-grow">
      <h2 className="text-lg mb-5 flex justify-between items-center">
        <span className="flex flex-row items-center">
          <Step step={3} active={weekData && dayData ? true : false} />
          <span>{lang.label}</span>
        </span>
        {weekData && dayData && (
          <span className="text-sm italic text-gray-500">
            ({weekLabel}-{dayLabel})
          </span>
        )}
      </h2>
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-2">
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
                  "flex justify-between rounded-md group disabled:cursor-not-allowed w-full h-full "
                }
                onClick={() => setTimeData(time.key)}
                disabled={dayData ? false : true}
              >
                <span
                  className={
                    "px-3 py-1 flex-grow text-left rounded-tl-md rounded-bl-md h-full text-md " +
                    " disabled:text-gray-500 " +
                    (time.key === timeData
                      ? "bg-emerald-600 "
                      : "bg-gray-700 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-gray-400 ") +
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
                    "px-3 py-1 flex flex-row justify-end items-center rounded-tr-md rounded-br-md min-w-[70px] h-full text-md " +
                    (time.key === timeData
                      ? "bg-emerald-500 "
                      : "bg-gray-600 ") +
                    (timeCount > 0 || time.key === timeData
                      ? "text-white "
                      : "text-gray-500 ") +
                    (dayData
                      ? time.key === timeData
                        ? "group-hover:bg-emerald-400 group-hover:text-white"
                        : "group-hover:bg-emerald-500 group-hover:text-white"
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
