// import libs
import React from "react";

// import components
import { StaticMap } from "./map-static";
import { DynamicMap } from "./map-dynamic";

interface MapProps {
  children?: React.ReactNode;
  pageContext?: any;
}

// Map Component
export const Map = ({ children }: MapProps) => {
  const dynamic = process.env.GATSBY_DYNAMIC_MAP || true;

  if (dynamic === "true") {
    return <DynamicMap>{children}</DynamicMap>;
  } else {
    return <StaticMap>{children}</StaticMap>;
  }
};
