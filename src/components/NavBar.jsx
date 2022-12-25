const NavBar = ({ handleClick }) => {
  return (
    <nav>
      <h1>Notes App</h1>
      <a onClick={() => handleClick(0)}>Home</a>
    </nav>
  );
};

export default NavBar;
