const Option = ({ courses }) => {
  return <option>{courses.name}</option>;
};

const Select = ({ courses, handleChange, chref }) => {
  // const uniqueEntries = courses.filter(
  //   (entry, index, self) =>
  //     self.findIndex((t) => t.course.name === entry.course.name) === index
  // );

  return (
    <div className="select-container">
      <label>Course:</label>
      <select ref={chref} onChange={handleChange}>
        <option>all</option>
        {courses.map((r, i) => (
          <Option key={i} courses={r}></Option>
        ))}
      </select>
    </div>
  );
};

export default Select;
