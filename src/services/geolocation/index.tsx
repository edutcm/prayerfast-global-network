// import libs
import axios, { AxiosRequestConfig } from "axios";
import { Buffer } from "buffer";

interface LocationProps {
  City: string;
  CountryId: string;
  Latitude: number;
  Longitude: number;
  TimeZoneId: string;
}

interface CoordProps {
  lon: Number;
  lat: Number;
}

export interface GeodataProps {
  lat: number;
  lon: number;
  city: string;
  country: string;
  cont: string;
  tz: string;
  tzCode: string;
  tzOffset: number;
  langKey: string;
  key?: string;
  count?: number;
  cityGeo: number;
  areaGeo: number;
  countryGeo: number;
}

// get parsed location data
export const getLocationData = async () => {
  // get location
  const userLocation: GeodataProps | void = await visitorLookup();

  if (userLocation) {
    const cityLocation: LocationProps = await lookupCity({
      lat: userLocation.lat,
      lon: userLocation.lon,
    });

    // build geodata
    const geodata: GeodataProps = {
      lat: cityLocation.Latitude,
      lon: cityLocation.Longitude,
      city: cityLocation.City,
      country: cityLocation.CountryId,
      cont: userLocation.cont,
      tz: cityLocation.TimeZoneId,
      tzOffset: userLocation.tzOffset,
      tzCode: userLocation.tzCode,
      langKey: userLocation.langKey,
      cityGeo: userLocation.cityGeo,
      areaGeo: userLocation.areaGeo,
      countryGeo: userLocation.countryGeo,
      count: 1,
    };

    // return geodata
    return geodata;
  }

  return null;
};

// lookup user by ip
// @see https://rapidapi.com/natkapral/api/ip-geo-location/
const visitorLookup = async () => {
  const apiKey = process.env.GATSBY_RAPID_API_KEY || false;

  const options: AxiosRequestConfig<any> = {
    method: "GET",
    url: "https://ip-geo-location.p.rapidapi.com/ip/check",
    params: { format: "json" },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com",
    },
  };

  return await axios
    .request(options)
    .then((response) => {
      const languages = response.data.country.languages;
      const langKey = Object.keys(languages)[0];

      const geodata: GeodataProps = {
        lat: response.data.location.latitude,
        lon: response.data.location.longitude,
        city: response.data.city.name,
        country: response.data.country.code,
        cont: response.data.continent.code,
        langKey: langKey,
        tz: response.data.time.timezone,
        tzCode: response.data.time.code,
        tzOffset: response.data.time.gmt_offset,
        cityGeo: response.data.city.geonameid,
        areaGeo: response.data.area.geonameid,
        countryGeo: response.data.country.geonameid,
      };
      return geodata;
    })
    .catch((error) => {
      console.error(error);
    });
};

// lookup nearest city by lat/lon
// @see https://rapidapi.com/Noggle/api/reverse-geocoding-and-geolocation-service/
const lookupCity = async ({ lat, lon }: CoordProps) => {
  const apiKey = process.env.GATSBY_RAPID_API_KEY || false;

  const options: AxiosRequestConfig<any> = {
    method: "GET",
    url: "https://geocodeapi.p.rapidapi.com/GetNearestCities",
    params: { latitude: lat, longitude: lon, range: "0" },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
    },
  };

  return await axios
    .request(options)
    .then((response) => {
      return response.data[0];
    })
    .catch((error) => {
      console.error(error);
    });
};
