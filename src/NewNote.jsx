import { useEffect, useState, useRef } from "react";
import Select from "./Select";
import "./NewNote.css";

const NewNote = ({ data, setData }) => {
  const [noteText, setNoteText] = useState("default");
  const [courseName, setCourseName] = useState("course");
  const [dateTime, setDateTime] = useState("null");
  const [text, setText] = useState("");
  const noteRef = useRef(null);

  const testdata = {
    id: 4,
    text: noteText,
    course: {
      id: 2,
      name: courseName,
    },
    // timestamp: "2022-12-224T13:13:13",
    timestamp: dateTime,
  };

  const sendNote = (param) => {
    const newData = { ...testdata };
    newData.text = param;
    setData([...data, newData]);
  };

  const GetTime = () => {
    let time = Date.now();
    let date = new Date(time).toISOString().slice(0, -5);
    return date;
  };

  const handleChange = (e) => {
    e.target.disabled = true;
    console.log(e.target.value);
    setCourseName(e.target.value);
    setDateTime(GetTime());
  };

  const handleSave = (e) => {
    sendNote(noteRef.current.value);
    noteRef.current.value = "";
  };

  //debug
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <>
      <h2>Add notes</h2>
      <Select data={data} handleChange={handleChange}></Select>
      <textarea ref={noteRef}></textarea>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default NewNote;
