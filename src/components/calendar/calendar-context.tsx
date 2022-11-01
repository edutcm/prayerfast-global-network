// import libs
import { createContext, useContext, Dispatch, SetStateAction } from "react";

export interface IWeeksProps {
  key: number;
  value: string;
}

export interface IDaysProps {
  key: string;
  value: string;
}

export interface IMealsProps {
  key: string;
  value: string;
}

export interface ICalendarData {
  week: string;
  day: string;
  time: string;
  meal?: string;
}

export interface ICalendarContextProps {
  // api data
  weeks: IWeeksProps[];
  days: IDaysProps[];
  meals: IMealsProps[];
  hours: Number[];
  calendar: any;
  setCalendar: Dispatch<SetStateAction<any>>;
  myCalendar: any;
  // my calendar
  setMyCalendar: (data: ICalendarData[]) => void;
  updateCalendar: (cb: CallableFunction) => void;
  // stats
  statsMinutes: number;
  statsHours: number;
  statsDays: number;
  statsPrayerTimes: number;
  statsFasts: number;
  setStatsMinutes: Dispatch<SetStateAction<number>>;
  setStatsHours: Dispatch<SetStateAction<number>>;
  setStatsDays: Dispatch<SetStateAction<number>>;
  setStatsPrayerTimes: Dispatch<SetStateAction<number>>;
  setStatsFasts: Dispatch<SetStateAction<number>>;
  // timepicker
  weekData: string;
  setWeekData: Dispatch<SetStateAction<string>>;
  dayData: string;
  setDayData: Dispatch<SetStateAction<string>>;
  timeData: string;
  setTimeData: Dispatch<SetStateAction<string>>;
  mealData: string;
  setMealData: Dispatch<SetStateAction<string>>;
  repeatOption: string;
  setRepeatOption: Dispatch<SetStateAction<string>>;
}

export const defaultState = {
  // api data
  weeks: [],
  days: [],
  meals: [],
  hours: [],
  calendar: [],
  setCalendar: () => null,
  // my calendar
  myCalendar: [],
  setMyCalendar: () => null,
  updateCalendar: () => null,
  // stats
  statsMinutes: 0,
  statsHours: 0,
  statsDays: 0,
  statsPrayerTimes: 0,
  statsFasts: 0,
  setStatsMinutes: () => null,
  setStatsHours: () => null,
  setStatsDays: () => null,
  setStatsPrayerTimes: () => null,
  setStatsFasts: () => null,
  // timepicker
  weekData: "",
  setWeekData: () => null,
  dayData: "",
  setDayData: () => null,
  timeData: "",
  setTimeData: () => null,
  mealData: "",
  setMealData: () => null,
  repeatOption: "m",
  setRepeatOption: () => null,
};

// app context
export const CalendarContext =
  createContext<ICalendarContextProps>(defaultState);

export const useCalendarContext = () => useContext(CalendarContext);
