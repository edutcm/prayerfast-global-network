import React from "react";
import { MDXProviderComponentsProp } from "@mdx-js/react";

export const H2 = (props: MDXProviderComponentsProp) => (
  <h2 className="text-2xl md:text-xl" {...props} />
);

export const P = (props: MDXProviderComponentsProp) => (
  <p className="text-base py-5" {...props} />
);

export const UL = (props: MDXProviderComponentsProp) => (
  <ul className="text-base py-5" {...props} />
);

export const LI = (props: MDXProviderComponentsProp) => (
  <li className="py-1" {...props} />
);
