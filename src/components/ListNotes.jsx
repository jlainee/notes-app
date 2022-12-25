import { useEffect, useState } from "react";
import "../ListNotes.css";
import Select from "./Select";

const Note = ({ data, deleteNote }) => {
  return (
    <div className="note">
      <div className="course-information">
        <span>
          {data.course.name} [id: {data.course.id}]
        </span>
        <button className="delete-button" onClick={() => deleteNote(data.id)}>
          [x]
        </button>
      </div>
      <div className="text-container">
        <span>{data.text}</span>
        <span className="timestamp">{data.timestamp}</span>
      </div>
    </div>
  );
};

const ListNotes = ({ courses, data, setData }) => {
  const [filteredData, setFilteredData] = useState(data);

  const deleteNote = (id) => {
    console.log(data);
    console.log(id);

    let Data = (entry) => entry.filter((ent) => ent.id != id);
    setData(Data);
    setFilteredData(Data);
  };

  const handleChange = (e) => {
    if (e.target.value === "all") {
      setFilteredData(data);
      return;
    }

    let filteredList = data.filter(
      (entry) => entry.course.name === e.target.value
    );
    setFilteredData(filteredList);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length <= 0) {
    return <h2 className="heading">No courses</h2>;
  }

  return (
    <div className="list-notes">
      <h2 className="heading">Saved notes</h2>
      <Select courses={courses} handleChange={handleChange}></Select>
      <div className="notes-container">
        {filteredData.map((r, i) => (
          <Note key={i} data={r} deleteNote={deleteNote}></Note>
        ))}
      </div>
    </div>
  );
};

export default ListNotes;
