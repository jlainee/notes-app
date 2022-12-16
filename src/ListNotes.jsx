import { useEffect, useState } from "react";
import Select from "./Select";

const Note = ({ data, deleteNote }) => {
  return (
    <>
      <li>
        {data.course.name} (id {data.course.id}) {data.timestamp}
        <button onClick={() => deleteNote(data.id)}>x</button>
      </li>
      <span>{data.text}</span>
    </>
  );
};

const ListNotes = ({ courses, data, setData }) => {
  // const [passedData, setPassedData] = useState(data);
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

  return (
    <>
      <h2>Saved notes</h2>
      <Select courses={courses} handleChange={handleChange}></Select>
      <ul>
        {filteredData.map((r, i) => (
          <Note key={i} data={r} deleteNote={deleteNote}></Note>
        ))}
      </ul>
    </>
  );
};

export default ListNotes;
