import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div></div>
      <div>
        <Link to="home">Home</Link>
        <Link to="settings">Settings</Link>
      </div>
    </div>
  );
};

export default Header;
