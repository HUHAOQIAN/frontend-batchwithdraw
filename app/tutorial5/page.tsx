import React from "react";
import Status from "./components/status";
import Heading from "./components/Heading";
import Oscar from "./components/Oscar";

const pages = () => {
  return (
    <div>
      pages
      <Status status="Loading" />
      <Heading>test</Heading>
      <Oscar>
        <Heading>test1</Heading>
      </Oscar>
    </div>
  );
};

export default pages;
