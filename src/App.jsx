import { useState, useEffect } from "react";
import "./App.css";
import "./NavBar";
import NavBar from "./NavBar";
import Links from "./Links";
import NewNote from "./NewNote";
import NewCourse from "./NewCourse";
import ListNotes from "./ListNotes";

function App() {
  const [count, setCount] = useState(0);
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
      <NavBar handleClick={setCount}></NavBar>
      <Links className="links" handleClick={setCount} count={count}></Links>
      {count === 1 && <NewNote data={data}></NewNote>}
      {count === 2 && <NewCourse></NewCourse>}
      {count === 3 && <ListNotes data={data}></ListNotes>}
    </>
  );
}

export default App;
