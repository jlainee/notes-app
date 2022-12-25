import { useEffect, useState, useRef } from "react";
import Select from "./Select";

const NewNote = ({ courses, data, setData }) => {
  const [notesSession, setNotesSession] = useState([]);
  const [noteId, setNoteId] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const noteRef = useRef(null);
  const childRef = useRef(null);
  const errorRef = useRef(null);

  const courseObject = {
    id: 0,
    name: "null",
  };

  const noteObject = {
    id: 0,
    text: "null",
    course: courseObject,
    timestamp: "",
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

  const handleSave = (e) => {
    CreateNote();
    setNoteId(noteId + 1);
    noteRef.current.value = "";
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log(new Date().getTimezoneOffset());
    console.log(new Date().toTimeString());
  };

  useEffect(() => {
    if (data.length > 0) {
      setNoteId(GetLastNoteId(data));
    }
  }, []);

  return (
    <div>
      <h2 className="heading">Add notes</h2>
      <div className="main-container">
        {isVisible && (
          <h3 ref={errorRef}>Note has to be longer than zero characters.</h3>
        )}
        <Select courses={courses} chref={childRef}></Select>

        <textarea ref={noteRef}></textarea>
        <button onClick={handleSave}>Save</button>
        <ul className="note-list">
          {notesSession.map((r, i) => (
            <li key={i}>{r.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewNote;
