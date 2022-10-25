// import libs
import React from "react";
import filter from "lodash/filter";
import { useCalendarContext } from "./calendar-context";

export const CalendarView = () => {
  const { calendar, setCalendar, days, weeks, hours } = useCalendarContext();

  return (
    <div className="bg-slate-900 text-white p-5 md:p-10 space-y-3">
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
            <div className="w-[12.5%] text-xs flex-grow-0 flex justify-center items-center text-white">
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
                      return (
                        <div
                          key={`${weekday}-${widx}-${hidx}`}
                          className="flex-grow-0 w-1/4 md:w-1/6 flex justify-center items-center my-[3px]"
                        >
                          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-slate-800 overflow-hidden">
                            <TimeCircle
                              time={`${hour}:00`}
                              week={week.key}
                              weekday={weekday}
                              calendar={calendar}
                              position="left"
                            />
                            <TimeCircle
                              time={`${hour}:30`}
                              week={week.key}
                              weekday={weekday}
                              calendar={calendar}
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
  calendar: any;
  position: string;
}

const TimeCircle = ({
  time,
  week,
  weekday,
  calendar,
  position,
}: TimeCircleProps) => {
  const params = {
    week: week.toString(),
    day: weekday.key,
    time: time,
  };

  const data = filter(calendar, params);

  if (data.length > 0 && position === "left") {
    return (
      <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 translate-x-[-50%]" />
    );
  }

  if (data.length > 0 && position === "right") {
    return (
      <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 translate-x-[50%] translate-y-[-100%]" />
    );
  }

  return null;
};