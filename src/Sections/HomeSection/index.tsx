import "./style.scss";
import React from "react";
import { Link } from "react-router-dom";

export const HomeSection = () => {
  return (
    <section id="home-section">

      <p>Hello World</p>

      <ul>
        <li><Link to="/practice">Practice</Link></li>
      </ul>

    </section>
  );
};
