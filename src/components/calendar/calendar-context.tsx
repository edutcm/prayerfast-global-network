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

export interface ICalendarContextProps {
  weeks: IWeeksProps[];
  days: IDaysProps[];
  meals: IMealsProps[];
  hours: Number[];
  calendar: any;
  setCalendar: Dispatch<SetStateAction<any>>;
  myCalendar: any;
  setMyCalendar: (
    weekData: number,
    dayData: string,
    timeData: number[]
  ) => void;
  updateCalendar: () => void;
}

export const defaultState = {
  weeks: [],
  days: [],
  meals: [],
  hours: [],
  calendar: [],
  setCalendar: () => null,
  myCalendar: [],
  setMyCalendar: () => null,
  updateCalendar: () => null,
};

// app context
export const CalendarContext =
  createContext<ICalendarContextProps>(defaultState);

export const useCalendarContext = () => useContext(CalendarContext);
