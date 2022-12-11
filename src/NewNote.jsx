import { useEffect, useState } from "react";
import Select from "./Select";

const NewNote = ({ data }) => {
  return (
    <>
      <h2>Add notes</h2>
      <Select data={data}></Select>
    </>
  );
};

export default NewNote;
