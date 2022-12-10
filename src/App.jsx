import { useState, useEffect } from "react";
import "./App.css";
import "./NavBar";
import NavBar from "./NavBar";
import Links from "./Links";
import Notes from "./Notes";
import NewCourse from "./NewCourse";
import ListNotes from "./ListNotes";

function App() {
  const [count, setCount] = useState(0);
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

  return (
    <>
      <NavBar handleClick={setCount}></NavBar>
      <Links handleClick={setCount} count={count}></Links>
      {count === 1 && <Notes data={filteredData}></Notes>}
      {count === 2 && <NewCourse></NewCourse>}
      {count === 3 && <ListNotes></ListNotes>}
    </>
  );
}

export default App;
