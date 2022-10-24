// import libs
import React, { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet.heat";
import { checkIsClient } from "../../utils/client";
import { useStaticQuery, graphql } from "gatsby";
import _ from "lodash";

// import css
import "leaflet/dist/leaflet.css";

// import components
import { AppContext } from "../../services/app";
import Loader from "../loader";

interface MapProps {
  children?: React.ReactNode;
  pageContext?: any;
}

interface PointProps {
  lat: number;
  lon: number;
  count: number;
}

// parse location data
const parseLocations = (data: any) => {
  return data.map((point: PointProps) => {
    const points: L.HeatLatLngTuple = [
      point.lat,
      point.lon,
      point.count, //count > 4 ? count/max : count/4
    ];
    return points;
  });
};

const parseCountriesByLocations = (data: any, countries: any) => {
  const locationGroups = _.groupBy(data, "country");

  const parsedCountries: any = [];

  Object.entries(locationGroups).forEach((location) => {
    const countryCode = location[0];
    const countryData = location[1];
    const country = _.find(countries, (c) => {
      return c.country === countryCode;
    });

    let countryCount = 0;
    countryData.forEach((c) => {
      countryCount = countryCount + c.count;
    });

    const locationData = {
      name: country.name,
      code: country.country,
      lat: country.latitude,
      lon: country.longitude,
      count: countryCount,
    };

    parsedCountries.push(locationData);
  });

  return parsedCountries;
};

// Map Component
export const StaticMap = ({ children }: MapProps) => {
  const isClient = checkIsClient();
  const [loading, setLoading] = useState(true);

  const { appCookies, setGeodata } = useContext(AppContext);

  if (!isClient) return null;

  // get countries
  const { geodata, countries } = useStaticQuery(graphql`
    query {
      countries: allCountriesCsv {
        nodes {
          country
          latitude
          longitude
          name
        }
      }
      geodata: allMongodbPrayerfastGeodata {
        nodes {
          id
          lat
          lon
          city
          country
          langKey
          tzOffset
          count
        }
        sum(field: count)
      }
    }
  `);

  useEffect(() => {
    // leaflet map
    const map = L.map("map", {
      zoomControl: true,
      attributionControl: true,
      minZoom: 2.15,
      maxZoom: 8,
      zoomSnap: 0.25,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
    });

    // added visual data
    if (geodata.nodes.length !== 0) {
      if (setGeodata) {
        setGeodata(geodata.nodes);
      }

      map.on("load", (ev) => {
        setLoading(false);
      });

      // map layer
      const Stamen_Watercolor = L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abcd",
          minZoom: 1,
          maxZoom: 16,
        }
      );
      Stamen_Watercolor.addTo(map);

      // labels
      const Stamen_TonerHybrid = L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abcd",
          minZoom: 0,
          maxZoom: 20,
        }
      );
      Stamen_TonerHybrid.addTo(map);

      const locations: L.HeatLatLngTuple[] = parseLocations(geodata.nodes);
      const countriesByLocations = parseCountriesByLocations(
        geodata.nodes,
        countries.nodes
      );

      countriesByLocations.map((location: any) => {
        const icon = L.divIcon({
          className: "!w-auto !min-w-[100px] block !z-[8000]",
          html: `<div class="flex text-xs">
            <div class="bg-slate-900/[65%] text-white rounded-l-md px-3 py-1 text-xs flex justify-center items-center drop-shadow">${location.name}</div>
            <div class="bg-emerald-500/[80%] text-white rounded-r-md px-3 py-1 text-xs flex justify-center items-center drop-shadow">${location.count}</div>
          </div>`,
        });
        const marker = new L.Marker([location.lat, location.lon], {
          icon: icon,
        });
        marker.addTo(map);
      });

      // create map points
      const points = locations.map((l) => {
        return L.latLng([l[0], l[1]]);
      });
      // extend the map to show the world
      points.push(L.latLng([68.837009, -166.103801])); // north slope alaska
      points.push(L.latLng([-47.063547, 167.865232])); // stewart island nz

      // get bounds
      const bounds = L.latLngBounds(points);

      // resize map to fit current bounds
      map.fitBounds(bounds, { padding: [15, 15] });

      // heatmap options
      const options: L.HeatMapOptions = {
        minOpacity: 0,
        // maxZoom: 8,
        radius: 25,
        blur: 18,
      };

      // add heatlayer to map
      L.heatLayer(locations, options).addTo(map);
    }

    return () => {
      map.off();
      map.remove();
    };
  }, [appCookies]);

  return (
    <div className="h-full !bg-slate-800">
      {loading && <Loader />}
      <div id="map" className="!bg-slate-800 h-full">
        {children}
      </div>
    </div>
  );
};
