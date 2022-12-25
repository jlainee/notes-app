import { useState, useEffect } from "react";
import "./App.css";
import "./components/NavBar";
import NavBar from "./components/NavBar";
import Links from "./components/Links";
import NewNote from "./components/NewNote";
import NewCourse from "./components/NewCourse";
import ListNotes from "./components/ListNotes";

function App() {
  const [courses, setCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [count, setCount] = useState(0);
  const URL = "https://luentomuistiinpano-api.deta.dev/notes/";
  const URL2 = "https://luentomuistiinpano-api.deta.dev/courses/";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setCourses(GetListOfCourses(response));
      });
    fetch(URL2)
      .then((response) => response.json())
      .then((response) => {
        setCoursesData(response);
      });
  }, []);

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
      <Links className="links" handleClick={setCount} count={count}></Links>
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
    </>
  );
}

export default App;
