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

const Notes = () => {
  const url = "https://luentomuistiinpano-api.deta.dev/notes/";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setFilteredData(response);
      });
  }, []);

  const uniqueEntries = data.filter(
    (entry, index, self) =>
      self.findIndex((t) => t.course.name === entry.course.name) === index
  );

  const handleChange = (e) => {
    // console.log(e.target.value + " changed");

    if (e.target.value === "all") {
      setFilteredData(data);
      return;
    }

    let filteredList = data.filter(
      (entry) => entry.course.name === e.target.value
    );
    setFilteredData(filteredList);
    console.log(filteredList);
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
