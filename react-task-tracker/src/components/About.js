import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div>
      <h1>This is Version 1.0.0. made by Katp</h1>
      <Link to="/">Press this to go back</Link>
    </div>
  );
};

export default About;
