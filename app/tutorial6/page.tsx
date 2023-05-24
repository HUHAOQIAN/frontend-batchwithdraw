"use client";
import React from "react";
import Button from "./components/Button";

const page = () => {
  return (
    <div className="App">
      page
      <Button
        handleClick={(event, id) => {
          console.log(`button click ${event} ${id}`);
        }}
      />
    </div>
  );
};

export default page;
