// import libs
import React from "react";
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
                          <div
                            className="w-full h-4 m-[1px] tooltip before:z-[500] before:content-[attr(data-tip)] cursor-pointer"
                            data-tip={hour.tooltip}
                          >
                            <div className="relative w-full h-full rounded-sm bg-slate-800 overflow-hidden">
                              <TimeCircle
                                time={hour.utc00}
                                week={week.key}
                                weekday={weekday}
                                position="left"
                              />
                              <TimeCircle
                                time={hour.utc30}
                                week={week.key}
                                weekday={weekday}
                                position="right"
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
}

const TimeCircle = ({ time, week, weekday, position }: TimeCircleProps) => {
  const params = {
    week: week.toString(),
    day: weekday.key,
    time: time,
  };

  const { calendar, myCalendar } = useCalendarContext();

  const data = filter(calendar, params);
  const myData = filter(myCalendar, params);

  return (
    <>
      {data.length > 0 && position === "left" && (
        <div className="absolute z-10 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-emerald-400 translate-x-[-50%]" />
      )}
      {data.length > 0 && position === "right" && (
        <div className="absolute z-10 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 translate-x-[50%]" />
      )}
      {myData.length > 0 && position === "left" && (
        <div className="absolute z-20 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-fuchsia-400 translate-x-[-50%]" />
      )}

      {myData.length > 0 && position === "right" && (
        <div className="absolute z-20 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-fuchsia-500  translate-x-[50%]" />
      )}
    </>
  );

  return null;
};
