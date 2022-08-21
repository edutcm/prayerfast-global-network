// import libs
import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";

// import components
import { AppContext } from "../../services/app";

interface ScoreboardProps {
  people: string;
  languages: string;
  cities: string;
  countries: string;
  timezones: string;
}

const Scoreboard = ({
  people,
  languages,
  cities,
  countries,
  timezones,
}: ScoreboardProps) => {
  const { geodata } = useContext(AppContext);

  // scores
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalLanguages, setTotalLanguages] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [totalTimezones, setTotalTimezones] = useState(0);

  useEffect(() => {
    setTotalPeople(parseTotalPeople());
    setTotalCountries(parseTotalCountries());
    setTotalCities(parseTotalCities());
    setTotalLanguages(parseTotalLanguages());
    setTotalTimezones(parseTotalTimezones());
  }, [geodata]);

  // total people
  const parseTotalPeople = () => {
    const counts = geodata?.map((location) => {
      return location.count;
    });

    let total = 0;
    counts?.forEach((c) => {
      if (c) {
        total = total + c;
      }
    });

    return total;
  };

  const parseTotalLanguages = () => {
    const counts = _.groupBy(geodata, "langKey");
    return Object.keys(counts).length;
  };

  const parseTotalCountries = () => {
    const counts = _.groupBy(geodata, "country");
    return Object.keys(counts).length;
  };

  const parseTotalCities = () => {
    if (geodata) {
      return geodata?.length;
    } else {
      return 0;
    }
  };

  const parseTotalTimezones = () => {
    const counts = _.groupBy(geodata, "tzOffset");
    return Object.keys(counts).length;
  };

  return (
    <div className="flex flex-wrap text-slate-400 text-center">
      <Counter
        text={people}
        count={totalPeople}
        className="flex justify-center items-center h-9 grow border-slate-700 border-r border-b md:border-b-0"
      />
      <Counter
        text={languages}
        count={totalLanguages}
        className="flex justify-center items-center h-9 grow border-slate-700 border-r border-b md:border-b-0"
      />
      <div className="basis-full h-0 md:basis-0" />
      <Counter
        text={cities}
        count={totalCities}
        className="flex justify-center items-center h-9 grow border-slate-700 border-r border-b md:border-b-0"
      />
      <Counter
        text={countries}
        count={totalCountries}
        className="flex justify-center items-center h-9 grow border-slate-700 border-r"
      />
      <Counter
        text={timezones}
        count={totalTimezones}
        className="flex justify-center items-center h-9 grow"
      />
    </div>
  );
};

// counter component
interface CounterProps {
  text: string;
  count: number;
  className: string;
}
const Counter = ({ text, count, className }: CounterProps) => {
  if (count === 0) {
    return (
      <div className={className}>
        <div className="flex justify-center items-center text-white">
          <div
            style={{
              borderTopColor: "transparent",
            }}
            className="w-3 h-3 border-2 border-slate-700 border-solid rounded-full animate-spin"
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className}>
        {text.replace("{{count}}", count.toString())}
      </div>
    );
  }
};

export default Scoreboard;
