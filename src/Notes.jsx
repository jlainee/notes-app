import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  return (
    <>
      <h2>Saved notes</h2>
      <label>Course:</label>
      <select>
        <option>all</option>
        <option>Ohjelmointi 1</option>
      </select>
      <ul>
        {data.map((r, i) => (
          <Note key={i} data={r}></Note>
        ))}
      </ul>
    </>
  );
};

export default Notes;
