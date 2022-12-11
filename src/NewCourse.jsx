import { useEffect, useState, useRef } from "react";

const Course = ({ props }) => {
  return <li>{props} added</li>;
};

const NewCourse = ({ courses, setCourses }) => {
  const [coursesLocal, setLocalCourses] = useState([]);
  const inputRef = useRef(null);
  const handleSave = () => {
    let input = inputRef.current.value;
    setCourses([...courses, input]);
    setLocalCourses([...coursesLocal, input]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <div>
      <h2>Add course</h2>
      <input placeholder="Course Name" ref={inputRef}></input>
      <button onClick={handleSave}>Save</button>
      <ul>
        {coursesLocal.map((r, i) => (
          <Course key={i} props={r}></Course>
        ))}
      </ul>
    </div>
  );
};

export default NewCourse;
