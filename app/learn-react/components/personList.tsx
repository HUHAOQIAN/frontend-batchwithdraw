import React from "react";
import { PersonProps } from "./person";

type PersonListProps = {
  names: Array<{ first: string; last: string }>;
};
const PersonList = (props: PersonListProps) => {
  return (
    <div>
      {props.names.map((name) => {
        return (
          <h2 key={name.first}>
            {name.first}
            {name.last}
          </h2>
        );
      })}
    </div>
  );
};
export default PersonList;
