const Option = ({ data }) => {
  return <option>{data.course.name}</option>;
};

const Select = ({ data, handleChange }) => {
  const uniqueEntries = data.filter(
    (entry, index, self) =>
      self.findIndex((t) => t.course.name === entry.course.name) === index
  );

  return (
    <>
      <label>Course:</label>
      <select onChange={handleChange}>
        <option>all</option>
        {uniqueEntries.map((r, i) => (
          <Option key={i} data={r}></Option>
        ))}
      </select>
    </>
  );
};

export default Select;
