import { useState, useEffect } from "react";
import "./App.css";
import "./NavBar";
import NavBar from "./NavBar";
import Links from "./Links";
import NewNote from "./NewNote";
import NewCourse from "./NewCourse";
import ListNotes from "./ListNotes";

//READ NOTES

function App() {
  const [courses, setCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [count, setCount] = useState(0);
  const url = "https://luentomuistiinpano-api.deta.dev/notes/";
  const url2 = "https://luentomuistiinpano-api.deta.dev/courses/";
  const [data, setData] = useState([]);
  let NoteAmount = data.length;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setCourses(GetListOfCourses(response));
      });
    fetch(url2)
      .then((response) => response.json())
      .then((response) => {
        setCoursesData(response);
      });
  }, []);

  const handleClick = (choice) => {
    if (NoteAmount <= 0 && choice === 3) {
      alert("You don't have any notes.");
    } else setCount(choice);
  };

  console.log(coursesData);
  const GetListOfCourses = (data) => {
    const uniqueCourses = Array.from(
      new Set(data.map((item) => item.course.name))
    );
    return uniqueCourses;
  };

  return (
    <>
      <NavBar handleClick={setCount}></NavBar>
      <Links className="links" handleClick={handleClick} count={count}></Links>
      {count === 1 && (
        <NewNote courses={coursesData} data={data} setData={setData}></NewNote>
      )}
      {count === 2 && (
        <NewCourse
          courses={coursesData}
          setCourses={setCoursesData}
        ></NewCourse>
      )}

      {count === 3 && (
        <ListNotes
          courses={coursesData}
          data={data}
          setData={setData}
        ></ListNotes>
      )}
      {/* <button onClick={() => console.log(test)}></button> */}
    </>
  );
}

export default App;
