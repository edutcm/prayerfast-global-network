// import libs
import React, { useState, useEffect } from "react";
import {
  useCalendarContext,
  ICalendarData,
  defaultState,
} from "./calendar-context";
import axios, { AxiosPromise } from "axios";

// import components
import { Step } from "./step";

export interface AddToCalendarProps {
  lang: any;
}

export const AddToCalendar = ({ lang }: AddToCalendarProps) => {
  const { weekData, dayData, timeData, mealData, repeatOption } =
    useCalendarContext();
  const { updateCalendar } = useCalendarContext();
  const {
    setWeekData,
    setDayData,
    setTimeData,
    setMealData,
    setRepeatOption,
    setGlobalDisabled,
  } = useCalendarContext();

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState(lang.add);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitting) {
      return setSubmitDisabled(true);
    }

    if (weekData && dayData && timeData) {
      setSubmitDisabled(false);
    }
  }, [submitting, weekData, dayData, timeData]);

  const handleSubmit = async () => {
    setGlobalDisabled(true);
    setSubmitting(true);
    setSubmitLabel(lang.adding);

    const data = {
      week: weekData,
      day: dayData,
      time: timeData,
      meal: mealData,
    };

    if (!weekData || !dayData || !timeData) {
      setSubmitting(false);
      setSubmitLabel(lang.add);
      return;
    }

    let items: any = [];
    switch (repeatOption) {
      // monthly
      case "m":
        items.push({
          week: weekData,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        break;

      // bimonthly
      case "b":
        const w = parseInt(weekData) + 2;
        const week2 = w > 4 ? w - 4 : w;
        items.push({
          week: weekData,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        items.push({
          week: week2,
          day: dayData,
          time: timeData,
          meal: mealData,
        });
        break;

      // weekly
      case "w":
        const loop: Number[] = [...Array(4).keys()];
        loop.forEach((l, idx) => {
          items.push({
            week: idx + 1,
            day: dayData,
            time: timeData,
            meal: mealData,
          });
        });
        break;
    }

    // build axios requests
    let requests: AxiosPromise[] = [];
    items.forEach((data: ICalendarData) => {
      requests.push(axios.post("/api/add-to-calendar", { data: data }));
    });

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setSubmitted(true);
          responses.forEach((response) => {
            console.log(
              "calendar document: ",
              response.data.insertedId
                ? response.data.insertedId
                : response.data.acknowledge
            );
          });
          updateCalendar(() => {
            setSubmitting(false);
            setWeekData(defaultState.weekData);
            setDayData(defaultState.dayData);
            setTimeData(defaultState.timeData);
            setMealData(defaultState.mealData);
            setRepeatOption(defaultState.repeatOption);
          });
        })
      )
      .catch((error) => {
        console.log(error.message);
      });
  };

  const resetForm = () => {
    setGlobalDisabled(false);
    setSubmitDisabled(true);
    setSubmitLabel(lang.add);
    setSubmitted(false);
  };

  return (
    <div className="px-5 py-10 md:p-10 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step
          step={6}
          active={weekData && dayData && timeData ? true : false}
        />
        {lang.label}
      </h2>
      {!submitted && (
        <button
          className="px-3 py-2 bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed mb-3"
          onClick={async () => handleSubmit()}
          disabled={submitDisabled}
        >
          {submitLabel}
        </button>
      )}
      {submitted && (
        <>
          <button
            className="px-3 py-2 bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed mb-3"
            onClick={async () => resetForm()}
          >
            {lang.add_more}
          </button>
          <p className="text-md text-gray-300">{lang.success}</p>
        </>
      )}
    </div>
  );
};
