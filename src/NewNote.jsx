import { useEffect, useState, useRef, useCallback } from "react";
import Select from "./Select";
import "./NewNote.css";

const NewNote = ({ courses, data, setData }) => {
  const [noteText, setNoteText] = useState("default");
  const [noteId, setNoteId] = useState(0);
  const [courseName, setCourseName] = useState("course");
  const [courseId, setCourseId] = useState("0");
  const [dateTime, setDateTime] = useState("null");
  const [text, setText] = useState("");
  const noteRef = useRef(null);
  const childRef = useRef();

  const dataStructure = {
    id: 0,
    text: "empty",
    course: {
      id: 0,
      name: "empty",
    },
    // timestamp: "2022-12-224T13:13:13",
    timestamp: dateTime,
  };

  const GetTime = () => {
    let time = Date.now();
    let date = new Date(time).toISOString().slice(0, -5);
    return date;
  };

  const GetCourseId = (name) => {
    for (const key in courses) {
      if (courses[key].name === name) return courses[key].id;
    }
  };

  const GetLastNoteId = (data) => {
    const lastNote = data[data.length - 1];
    return lastNote.id;
  };

  const CreateNote = () => {
    let name = childRef.current.value;
    childRef.current.disabled = true;
    const newData = { ...dataStructure };
    newData.id = noteId + 1;
    newData.text = noteRef.current.value;
    newData.course.id = GetCourseId(name);
    newData.course.name = name;
    newData.timestamp = GetTime();
    setData([...data, newData]);
  };

  const handleChange = (e) => {};

  const handleSave = (e) => {
    // console.log("Note ID before set: " + noteId);
    CreateNote();
    setNoteId(noteId + 1);
    noteRef.current.value = "";
  };

  useEffect(() => {
    if (data.length <= 0) {
      console.log("No notes");
    } else {
      setNoteId(GetLastNoteId(data));
    }
  }, []);

  useEffect(() => {
    console.log("Set Note ID: " + noteId);
  }, [noteId]);

  return (
    <>
      <h2>Add notes</h2>
      <Select
        courses={courses}
        handleChange={handleChange}
        chref={childRef}
      ></Select>
      <textarea ref={noteRef}></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => console.log("Note ID now: " + noteId)}>ID</button>
      <button onClick={() => console.log(data)}>Data</button>
    </>
  );
};

export default NewNote;
