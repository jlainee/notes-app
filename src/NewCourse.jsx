import { useEffect, useState, useRef } from "react";

const Course = ({ props }) => {
  return (
    <li>
      {props.name} added with id: {props.id}
    </li>
  );
};

const GetLastCourseId = (data) => {
  const lastNote = data[data.length - 1];
  return lastNote.id;
};

const NewCourse = ({ courses, setCourses }) => {
  const [coursesSession, setCoursesSession] = useState([]);
  const [courseId, setCourseId] = useState(GetLastCourseId(courses));

  const inputRef = useRef(null);
  const handleSave = () => {
    let input = inputRef.current.value;
    let courseData = {
      id: courseId + 1,
      name: input,
    };

    setCourses([...courses, courseData]);
    setCoursesSession([...coursesSession, courseData]);
    setCourseId(courseId + 1);

    inputRef.current.value = "";
  };

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <div>
      <h2 className="heading">Add course</h2>
      <div className="main-container">
        <input placeholder="Course Name" ref={inputRef}></input>
        <button onClick={handleSave}>Save</button>
        <ul className="course-list">
          {coursesSession.map((r, i) => (
            <Course key={i} props={r}></Course>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewCourse;
