// import libs
import React from "react";
import filter from "lodash/filter";
import { useCalendarContext } from "./calendar-context";

export const CalendarView = () => {
  const { days, weeks, hours } = useCalendarContext();

  return (
    <div className="bg-slate-900 text-slate-400 p-5 md:p-14 space-y-3 flex-grow">
      <div className="flex flex-row w-full space-x-3">
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
          <div key={`week-${widx}`} className="flex flex-row w-full space-x-3">
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
                    {hours.map((hour, hidx) => {
                      const leadingZero = hour < 10 ? "0" : "";

                      return (
                        <div
                          key={`${weekday}-${widx}-${hidx}`}
                          className="flex-grow-0 w-1/4 md:w-1/6 flex justify-center items-center box-border"
                        >
                          <div className="relative w-full h-3 md:h-4 rounded-sm bg-slate-800 overflow-hidden m-[1px]">
                            <TimeCircle
                              time={`${leadingZero}${hour}:00`}
                              week={week.key}
                              weekday={weekday}
                              position="left"
                            />
                            <TimeCircle
                              time={`${leadingZero}${hour}:30`}
                              week={week.key}
                              weekday={weekday}
                              position="right"
                            />
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
        <div className="absolute z-10 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 translate-x-[-50%]" />
      )}
      {data.length > 0 && position === "right" && (
        <div className="absolute z-10 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 translate-x-[50%]" />
      )}
      {myData.length > 0 && position === "left" && (
        <div className="absolute z-20 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-orange-400 translate-x-[-50%]" />
      )}

      {myData.length > 0 && position === "right" && (
        <div className="absolute z-20 top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-orange-400 translate-x-[50%]" />
      )}
    </>
  );

  return null;
};
