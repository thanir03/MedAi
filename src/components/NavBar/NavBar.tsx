import React from "react";
import image from "../../asset/logo.png";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["logo"]}>
        <img className={styles["img"]} src={image} alt="MedAI logo" />
        <h1>MedAI</h1>
      </div>
      <div className={styles["navigation-link"]}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]} ${styles["link"]}` : styles["link"]
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]} ${styles["link"]}` : styles["link"]
          }
          to={"/disease"}
        >
          Disease
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
