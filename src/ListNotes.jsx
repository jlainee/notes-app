import { useEffect, useState } from "react";
import Select from "./Select";

const Note = ({ data }) => {
  return (
    <>
      <li>
        {data.course.name} (id {data.course.id}) {data.timestamp}
      </li>
      <span>{data.text}</span>
    </>
  );
};

const ListNotes = ({ data }) => {
  // const [passedData, setPassedData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

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

  return (
    <>
      <h2>Saved notes</h2>
      <Select data={data} handleChange={handleChange}></Select>
      <ul>
        {filteredData.map((r, i) => (
          <Note key={i} data={r}></Note>
        ))}
      </ul>
    </>
  );
};

export default ListNotes;
