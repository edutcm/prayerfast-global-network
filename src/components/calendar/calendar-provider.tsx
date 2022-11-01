// import libs
import React, { FC, useEffect, useState } from "react";
import { CalendarContext, defaultState } from "./calendar-context";
import type { IWeeksProps, IDaysProps, IMealsProps } from "./calendar-context";
import axios from "axios";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import forEach from "lodash/forEach";
import type { ICalendarData } from "./calendar-context";

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
    { key: "u", value: "Sundays" },
    { key: "m", value: "Mondays" },
    { key: "t", value: "Tuesdays" },
    { key: "w", value: "Wednesdays" },
    { key: "r", value: "Thursdays" },
    { key: "f", value: "Fridays" },
    { key: "s", value: "Saturdays" },
  ];

  const meals: IMealsProps[] = [
    { key: "b", value: "Breakfast" },
    { key: "l", value: "Lunch" },
    { key: "d", value: "Dinner" },
  ];

  const hours: Number[] = [...Array(24).keys()];

  const [calendar, setCalendar] = useState<any>(defaultState.calendar);

  const [myCalendar, setMyCalendarFn] = useState<any>(defaultState.myCalendar);

  // timepicker
  const [weekData, setWeekData] = useState<string>(defaultState.weekData);
  const [dayData, setDayData] = useState<string>(defaultState.dayData);
  const [timeData, setTimeData] = useState<string>(defaultState.timeData);
  const [mealData, setMealData] = useState<string>(defaultState.mealData);
  const [repeatOption, setRepeatOption] = useState<string>(
    defaultState.repeatOption
  );

  useEffect(() => {
    updateCalendar(() => {});
  }, []);

  const updateCalendar = (cb: CallableFunction) => {
    axios.get("/api/calendar").then((res) => {
      setCalendar(res.data);

      return cb();
    });
  };

  const setMyCalendar = (data: ICalendarData[]) => {
    // clone myCalendar data
    const myCalendarData = JSON.parse(JSON.stringify(myCalendar));
    data.forEach((item) => {
      const match = find(myCalendarData, item);
      if (!match) {
        myCalendarData.push(item);
      }
    });

    // add items to myCalendar
    setMyCalendarFn(myCalendarData);
  };

  const [statsMinutes, setStatsMinutes] = useState(defaultState.statsMinutes);
  const [statsHours, setStatsHours] = useState(defaultState.statsHours);
  const [statsDays, setStatsDays] = useState(defaultState.statsDays);
  const [statsPrayerTimes, setStatsPrayerTimes] = useState(
    defaultState.statsPrayerTimes
  );
  const [statsFasts, setStatsFasts] = useState(defaultState.statsFasts);

  useEffect(() => {
    let weekData: any = groupBy(calendar, "week");
    let days: number = 0;
    let minutes: number = 0;
    let prayers: number = 0;
    let fasts: number = 0;

    forEach(calendar, (item) => {
      minutes = minutes + 30; // add 30 minutes for each item
      prayers = prayers + item.count;

      const { b, l, d } = item.meals;
      fasts = fasts + b + l + d;
    });

    forEach(weekData, (week, idx) => {
      const dayData = groupBy(week, "day");
      weekData[idx] = dayData;
      days = days + Object.keys(dayData).length;
    });

    setStatsDays(days);
    setStatsMinutes(minutes);
    setStatsHours(minutes / 60);
    setStatsPrayerTimes(prayers);
    setStatsFasts(fasts);
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
        statsPrayerTimes,
        setStatsPrayerTimes,
        statsFasts,
        setStatsFasts,
        // timepicker
        weekData,
        setWeekData,
        dayData,
        setDayData,
        timeData,
        setTimeData,
        mealData,
        setMealData,
        repeatOption,
        setRepeatOption,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
