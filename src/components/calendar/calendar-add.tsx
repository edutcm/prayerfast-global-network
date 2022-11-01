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

export const AddToCalendar = () => {
  const { weekData, dayData, timeData, mealData, repeatOption } =
    useCalendarContext();
  const { updateCalendar } = useCalendarContext();
  const { setWeekData, setDayData, setTimeData, setMealData, setRepeatOption } =
    useCalendarContext();

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("Add to calendar");

  useEffect(() => {
    if (submitting) {
      return setSubmitDisabled(true);
    }

    if (weekData && dayData && timeData) {
      setSubmitDisabled(false);
    }
  }, [submitting, weekData, dayData, timeData]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitLabel("Adding...");

    const data = {
      week: weekData,
      day: dayData,
      time: timeData,
      meal: mealData,
    };

    if (!weekData || !dayData || !timeData) {
      setSubmitting(false);
      setSubmitLabel("Add to calendar");
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
          responses.forEach((response) => {
            console.log(
              "calendar document: ",
              response.data.insertedId
                ? response.data.insertedId
                : response.data.acknowledge
            );
          });
          updateCalendar(() => {
            setWeekData(defaultState.weekData);
            setDayData(defaultState.dayData);
            setTimeData(defaultState.timeData);
            setMealData(defaultState.mealData);
            setRepeatOption(defaultState.repeatOption);
            setSubmitting(false);
            setSubmitLabel("Add another time");
          });
        })
      )
      .catch((error) => {
        console.log(error.message);
      });

    // loop through items to add to calendar
    // items.forEach(async (data: ICalendarData) => {
    //   await axios
    //     .post("/api/add-to-calendar", {
    //       data: data,
    //     })
    //     .then((res) => {
    //       console.log(
    //         "calendar document: ",
    //         res.data.insertedId ? res.data.insertedId : res.data.acknowledge
    //       );
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // });

    // await axios
    //   .post("/api/add-to-calendar", {
    //     data: data,
    //   })
    //   .then((res) => {
    //     console.log(
    //       "calendar document: ",
    //       res.data.insertedId ? res.data.insertedId : res.data.acknowledge
    //     );
    //     updateCalendar(() => {
    //       setWeekData("");
    //       setDayData("");
    //       setTimeData("");
    //       setMealData("");
    //       setSubmitting(false);
    //       setSubmitLabel("Add another time");
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  return (
    <div className="px-5 py-10 md:p-10 flex-grow">
      <h2 className="text-lg mb-5 flex flex-row items-center">
        <Step
          step={6}
          active={weekData && dayData && timeData ? true : false}
        />
        Last Step
      </h2>
      {!submitDisabled && (
        <button
          className="px-3 py-2 bg-emerald-500/80 hover:bg-emerald-500 rounded-md border-0 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={async () => handleSubmit()}
          disabled={submitDisabled}
        >
          {submitLabel}
        </button>
      )}
      {submitDisabled && (
        <p className="text-md text-gray-500">
          Thank you! We have anonymously added your prayer time to our global
          list of people praying and fasting the PrayerFast Prayer.
        </p>
      )}
    </div>
  );
};
