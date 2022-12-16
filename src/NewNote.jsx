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
  const [isVisible, setVisible] = useState(false);
  const noteRef = useRef(null);
  const childRef = useRef(null);
  const errorRef = useRef(null);
  // const [disabled, setDisabled] = useState(true);

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
    let noteText = noteRef.current.value;

    if (noteText <= 0) {
      setVisible(true);
      setTimeout(() => {
        // errorRef.current.value = "fk you";
        setVisible(false);
      }, 4000);
      return;
    }

    childRef.current.disabled = true;
    const newData = { ...dataStructure };
    newData.id = noteId + 1;
    newData.text = noteText;
    newData.course.id = GetCourseId(name);
    newData.course.name = name;
    newData.timestamp = GetTime();
    setData([...data, newData]);
  };

  const handleChange = (e) => {
    // if (checkSelected() === true) {
    //   noteRef.current.value = "";
    // }
  };

  const handleSave = (e) => {
    CreateNote();
    setNoteId(noteId + 1);
    noteRef.current.value = "";
  };

  // not sure if will be used
  // const checkSelected = () => {
  //   if (childRef.current.value === "all") {
  //     setDisabled(true);
  //     return true;
  //   } else {
  //     setDisabled(false);
  //     return false;
  //   }
  // };

  useEffect(() => {
    if (data.length <= 0) {
      console.log("No notes");
    } else {
      setNoteId(GetLastNoteId(data));
    }
  }, []);

  useEffect(() => {
    // console.log("Set Note ID: " + noteId);
  }, [noteId]);

  return (
    <>
      <h2>Add notes</h2>
      {isVisible && (
        <h3 ref={errorRef}>Note has to be longer than zero characters.</h3>
      )}
      <Select
        courses={courses}
        handleChange={handleChange}
        chref={childRef}
      ></Select>
      <textarea ref={noteRef}></textarea>
      <button onClick={handleSave}>Save</button>
      {/* <button onClick={() => console.log("Note ID now: " + noteId)}>ID</button> */}
      {/* <button onClick={() => console.log(data)}>Data</button> */}
    </>
  );
};

export default NewNote;
