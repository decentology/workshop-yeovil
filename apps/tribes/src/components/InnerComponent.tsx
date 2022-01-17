import React from "react";
/// @ts-ignore
import { useTribes } from "@hyperverse/hyperverse-ethereum-tribes";
import { FC } from "react";
const InnerComponent: React.FunctionComponent<any> = ({ children }) => {
  const { useTribeEvents } = useTribes();
  useTribeEvents("JoinedTribe", (x: any) => {
    console.log("bob", x);
  });
  
  return <div>{children}</div>;
};

export default InnerComponent;
