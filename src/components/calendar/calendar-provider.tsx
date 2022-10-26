// import libs
import React, { FC, useEffect, useState } from "react";
import { CalendarContext, defaultState } from "./calendar-context";
import type { IWeeksProps, IDaysProps, IMealsProps } from "./calendar-context";
import axios from "axios";
import merge from "lodash/merge";
import find from "lodash/find";

// calendar provider
export const CalendarProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const weeks: IWeeksProps[] = [
    { key: 1, value: "Week 1" },
    { key: 2, value: "Week 2" },
    { key: 3, value: "Week 3" },
    { key: 4, value: "Week 4" },
  ];

  const days: IDaysProps[] = [
    { key: "u", value: "Sunday" },
    { key: "m", value: "Monday" },
    { key: "t", value: "Tuesday" },
    { key: "w", value: "Wednesday" },
    { key: "r", value: "Thursday" },
    { key: "f", value: "Friday" },
    { key: "s", value: "Saturday" },
  ];

  const meals: IMealsProps[] = [
    { key: "b", value: "Breakfast" },
    { key: "l", value: "Lunch" },
    { key: "d", value: "Dinner" },
  ];

  const hours: Number[] = [...Array(24).keys()];

  const [calendar, setCalendar] = useState<any>(defaultState.calendar);

  const [myCalendar, setMyCalendarFn] = useState<any>(defaultState.myCalendar);

  useEffect(() => {
    updateCalendar();
  }, []);

  const updateCalendar = () => {
    axios.get("/api/calendar").then((res) => {
      setCalendar(res.data);
    });
  };

  const setMyCalendar = (
    weekData: number,
    dayData: string,
    timeData: number[]
  ) => {
    console.log(myCalendar);

    // build items
    let items: any = [];
    timeData.forEach((time) => {
      const data = {
        week: weekData,
        day: dayData,
        time: time,
      };
      items.push(data);
    });

    // clone myCalendar data
    const myCalendarData = JSON.parse(JSON.stringify(myCalendar));

    // add items to myCalendar
    items.forEach((item: any) => {
      const match = find(myCalendarData, item);
      if (!match) {
        myCalendarData.push(item);
      }
    });

    setMyCalendarFn(myCalendarData);
  };

  return (
    <CalendarContext.Provider
      value={{
        weeks,
        days,
        meals,
        hours,
        calendar,
        setCalendar,
        updateCalendar,
        myCalendar,
        setMyCalendar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
