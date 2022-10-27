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
  updateCalendar: () => void;
  // stats
  statsMinutes: number;
  statsHours: number;
  statsDays: number;
  statsSlots: number;
  statsPrayerTimes: number;
  setStatsMinutes: Dispatch<SetStateAction<number>>;
  setStatsHours: Dispatch<SetStateAction<number>>;
  setStatsDays: Dispatch<SetStateAction<number>>;
  setStatsSlots: Dispatch<SetStateAction<number>>;
  setStatsPrayerTimes: Dispatch<SetStateAction<number>>;
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
  statsSlots: 0,
  statsPrayerTimes: 0,
  setStatsMinutes: () => null,
  setStatsHours: () => null,
  setStatsDays: () => null,
  setStatsSlots: () => null,
  setStatsPrayerTimes: () => null,
};

// app context
export const CalendarContext =
  createContext<ICalendarContextProps>(defaultState);

export const useCalendarContext = () => useContext(CalendarContext);
