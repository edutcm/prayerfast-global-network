// import libs
import React from "react";

type StepProps = {
  step: number;
  active: boolean;
};

export const Step = ({ step, active }: StepProps) => (
  <span
    className={
      "w-8 h-8 mr-3 rounded-full flex justify-center items-center " +
      (active ? "bg-emerald-600 text-white" : "bg-gray-600 text-gray-400")
    }
  >
    {step}
  </span>
);
