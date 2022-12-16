import { useEffect, useState, useRef, useCallback } from "react";
import Select from "./Select";
import "./NewNote.css";

const NewNote = ({ courses, data, setData }) => {
  const [notesSession, setNotesSession] = useState([]);
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

  const courseObject = {
    id: 0,
    name: "null",
  };

  const noteObject = {
    id: 0,
    text: "null",
    course: courseObject,
    timestamp: dateTime,
  };

  const GetTime = () => {
    let time = new Date();
    let offset = time.getTimezoneOffset() / -60;
    time.setHours(time.getHours() + offset);
    time = time.toISOString().slice(0, -5);
    return time;
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
        setVisible(false);
      }, 4000);
      return;
    }

    childRef.current.disabled = true;
    const noteData = { ...noteObject };
    noteData.id = noteId + 1;
    noteData.text = noteText;
    noteData.course.id = GetCourseId(name);
    noteData.course.name = name;
    noteData.timestamp = GetTime();
    setData([...data, noteData]);
    setNotesSession([...notesSession, noteData]);
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
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log(new Date().getTimezoneOffset());
    console.log(new Date().toTimeString());
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
      <ul>
        {notesSession.map((r, i) => (
          <li key={i}>{r.text}</li>
        ))}
      </ul>
      {/* <button onClick={() => console.log("Note ID now: " + noteId)}>ID</button> */}
      {/* <button onClick={() => console.log(data)}>Data</button> */}
    </>
  );
};

export default NewNote;
