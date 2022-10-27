// import libs
import React, { FC, useEffect, useState } from "react";
import { CalendarContext, defaultState } from "./calendar-context";
import type { IWeeksProps, IDaysProps, IMealsProps } from "./calendar-context";
import axios from "axios";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import forEach from "lodash/forEach";

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
    timeData: string,
    meal?: string
  ) => {
    const data = {
      week: weekData,
      day: dayData,
      time: timeData,
    };

    // clone myCalendar data
    const myCalendarData = JSON.parse(JSON.stringify(myCalendar));

    // add items to myCalendar
    const match = find(myCalendarData, data);
    if (!match) {
      myCalendarData.push(data);
    }

    setMyCalendarFn(myCalendarData);
    updateCalendar();
  };

  const [statsMinutes, setStatsMinutes] = useState(defaultState.statsMinutes);
  const [statsHours, setStatsHours] = useState(defaultState.statsHours);
  const [statsDays, setStatsDays] = useState(defaultState.statsDays);
  const [statsSlots, setStatsSlots] = useState(defaultState.statsSlots);
  const [statsPrayerTimes, setStatsPrayerTimes] = useState(
    defaultState.statsPrayerTimes
  );

  useEffect(() => {
    let weekData: any = groupBy(calendar, "week");
    let days: number = 0;
    let minutes: number = 0;
    let slots: number = 0;
    let prayers: number = 0;

    forEach(calendar, (item) => {
      minutes = minutes + 30;
      slots = slots + 1;
      prayers = prayers + item.count;
    });

    forEach(weekData, (week, idx) => {
      const dayData = groupBy(week, "day");
      weekData[idx] = dayData;
      days = days + Object.keys(dayData).length;
    });

    setStatsDays(days);
    setStatsMinutes(minutes);
    setStatsHours(minutes / 60);
    setStatsSlots(slots);
    setStatsPrayerTimes(prayers);
  }, [calendar]);

  return (
    <CalendarContext.Provider
      value={{
        // api data
        weeks,
        days,
        meals,
        hours,
        calendar,
        setCalendar,
        updateCalendar,
        // my calendar
        myCalendar,
        setMyCalendar,
        // stats
        statsMinutes,
        setStatsMinutes,
        statsHours,
        setStatsHours,
        statsDays,
        setStatsDays,
        statsSlots,
        setStatsSlots,
        statsPrayerTimes,
        setStatsPrayerTimes,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
