import { useEffect, useState } from "react";
import Select from "./Select";
import "./NewNote.css";

const NewNote = ({ data }) => {
  const handleChange = (e) => {
    e.target.disabled = true;
  };

  return (
    <>
      <h2>Add notes</h2>
      <Select data={data} handleChange={handleChange}></Select>
      <textarea></textarea>
    </>
  );
};

export default NewNote;
