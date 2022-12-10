import { useState } from "react";
import "./App.css";
import "./NavBar";
import NavBar from "./NavBar";
import Links from "./Links";
import Notes from "./Notes";
import NewCourse from "./NewCourse";
import ListNotes from "./ListNotes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar handleClick={setCount}></NavBar>
      <Links handleClick={setCount} count={count}></Links>
      {count === 1 && <Notes></Notes>}
      {count === 2 && <NewCourse></NewCourse>}
      {count === 3 && <ListNotes></ListNotes>}
    </>
  );
}

export default App;
