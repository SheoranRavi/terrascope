import React from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Sidebar className={styles.sidebar}/>
      <Map className={styles.map}/>
    </div>
  )
}