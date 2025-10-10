import React, {useState} from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./HomePage.module.css";
import { Button } from "@chakra-ui/react";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.layout}>
      {!sidebarOpen && (
        <Button
          className={styles.sidebarButton}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </Button>
      )}
      <Sidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className={
        sidebarOpen ? `${styles.mapArea} ${styles.mapAreaWithSidebar}`
                    : styles.mapArea}>
        <Map />
      </main>
    </div>
  )
}