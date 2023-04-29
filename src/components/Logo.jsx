import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Github-Mark.png'

const Logo = () => {
  return (
    <Link to='/'><div className="flex flex-col md:flex-row pb-2 justify-center items-center">
      <img
        src={logo}
        className="w-20 rounded-full"
      />
      <h1 className="text-2xl md:text-4xl text-black px-2">GitHub Profile Viewer</h1>
    </div></Link>
  );
};

export default Logo;
