// import libs
import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import { useCalendarContext } from "./calendar-context";
import { DateTime } from "luxon";
import { useAppContext } from "../../services/app";

export const CalendarView = () => {
  const { days, weeks, hours } = useCalendarContext();
  const { locale } = useAppContext();

  let timeSlots: any = [];

  hours.forEach((hour) => {
    const leadingZero = hour < 10 ? "0" : "";
    timeSlots.push(`${leadingZero}${hour}:00`);
  });

  // datetime setup
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cdt = DateTime.local();
  const date = cdt.toFormat("y-MM-dd");
  let hoursData: any = [];
  timeSlots.forEach((time: any) => {
    const dt = DateTime.fromISO(`${date}T${time}:00`, { zone: "utc" });
    const kdt = dt.setLocale(locale).setZone(timezone);

    hoursData.push({
      utc00: dt.toFormat("HH:mm"),
      utc30: dt.plus({ minutes: 30 }).toFormat("HH:mm"),
      local: `${kdt.toFormat("HH:mm")}`,
      tooltip: `${kdt.toLocaleString(DateTime.TIME_SIMPLE)} ${kdt.toFormat(
        "ZZZZ"
      )}`,
      datetime: kdt,
    });
  });

  hoursData.sort((a: any, b: any) => {
    return a.datetime.toFormat("HHmm") - b.datetime.toFormat("HHmm");
  });

  return (
    <div className="bg-slate-900 text-slate-400 px-5 py-10 md:p-14 space-y-3 flex-grow w-screen md:w-auto overflow-x-scroll">
      <div className="flex flex-row w-full space-x-3 min-w-[48rem]">
        <div className="w-[12.5%] flex-grow-0" />
        {days.map((day, idx) => {
          return (
            <div
              key={`week-header-${idx}`}
              className="w-[12.5%] text-xs flex-grow-0 flex justify-center"
            >
              {day.value}
            </div>
          );
        })}
      </div>
      {weeks.map((week, widx) => {
        return (
          <div
            key={`week-${widx}`}
            className="flex flex-row w-full space-x-3 min-w-[48rem]"
          >
            <div className="w-[12.5%] text-xs flex-grow-0 flex justify-center items-center">
              {week.value}
            </div>
            {days.map((weekday, widx) => {
              return (
                <div
                  key={`${weekday}-${widx}`}
                  className="w-[12.5%] flex flex-row flex-wrap flex-grow-0"
                >
                  <div className="mb-2 w-full flex flex-wrap">
                    {hoursData.map((hour: any, hidx: number) => {
                      return (
                        <div
                          key={`${weekday}-${widx}-${hidx}`}
                          className="flex-grow-0 w-1/4 md:w-1/6 flex justify-center items-center box-border"
                        >
                          <div className="w-full h-4 m-[1px]">
                            <div className="flex flex-row w-full h-full rounded-sm bg-slate-800">
                              <TimeCircle
                                time={hour.utc00}
                                week={week.key}
                                weekday={weekday}
                                position="left"
                                tooltip={hour.tooltip}
                              />
                              <TimeCircle
                                time={hour.utc30}
                                week={week.key}
                                weekday={weekday}
                                position="right"
                                tooltip={hour.tooltip.replace(":00", ":30")}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface TimeCircleProps {
  time: any;
  week: any;
  weekday: any;
  position: string;
  tooltip: string;
}

const TimeCircle = ({
  time,
  week,
  weekday,
  position,
  tooltip,
}: TimeCircleProps) => {
  const params = {
    week: week.toString(),
    day: weekday.key,
    time: time,
  };

  const { calendar } = useCalendarContext();
  const { dayData, timeData, weekData } = useCalendarContext();
  const { setDayData, setTimeData, setWeekData } = useCalendarContext();

  const data = filter(calendar, params);

  const [className, setClassName] = useState("");

  const handleClick = () => {
    setDayData(weekday.key);
    setWeekData(week);
    setTimeData(time);
  };

  useEffect(() => {
    let className: string = "";

    // local selection
    if (
      params.day === dayData &&
      params.time === timeData &&
      params.week === weekData.toString()
    ) {
      className = "bg-fuchsia-500 ";
    }
    // global data
    else {
      if (data.length > 0 && position === "left") {
        className = "bg-emerald-400 ";
      }
      if (data.length > 0 && position === "right") {
        className = "bg-emerald-600 ";
      }
      className = className + " hover:bg-emerald-300";
    }

    // positioning
    if (position === "left") {
      className = className + "rounded-tl-sm rounded-bl-sm";
    } else {
      className = className + "rounded-tr-sm rounded-br-sm";
    }

    className = className + " hover:bg-fuchsia-400";

    setClassName(className);
  }, [dayData, data, timeData, weekData, params]);

  return (
    <div
      className={`w-[50%] h-full flex-grow-0 tooltip before:z-[500] before:content-[attr(data-tip)] cursor-pointer ${className}`}
      data-tip={tooltip}
      onClick={handleClick}
    />
  );
};
