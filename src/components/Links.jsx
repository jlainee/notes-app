const Links = ({ handleClick, count }) => {
  return (
    <div className="links">
      {count === 0 && <a onClick={() => handleClick(1)}>Create Notes</a>}
      {count === 0 && <a onClick={() => handleClick(2)}>Add courses</a>}
      {count === 0 && <a onClick={() => handleClick(3)}>List notes</a>}
    </div>
  );
};

export default Links;
