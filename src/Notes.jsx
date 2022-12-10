import { useEffect, useState } from "react";

const Option = ({ data }) => {
  return <option>{data.course.name}</option>;
};

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

const Notes = ({ data }) => {
  // const [passedData, setPassedData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const uniqueEntries = data.filter(
    (entry, index, self) =>
      self.findIndex((t) => t.course.name === entry.course.name) === index
  );

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
      <label>Course:</label>
      <select onChange={handleChange}>
        <option>all</option>
        {uniqueEntries.map((r, i) => (
          <Option key={i} data={r}></Option>
        ))}
      </select>
      <ul>
        {filteredData.map((r, i) => (
          <Note key={i} data={r}></Note>
        ))}
      </ul>
    </>
  );
};

export default Notes;
