import CardWithForm from "@/components/CardWithForm";
import React from "react";
import styles from "@/pages/newTask/newTask.module.css";
import NavBar from "@/components/navBar";

function NewTask() {
  return (
    <div>
      <NavBar />
      <div className={styles.newTask}>
        <CardWithForm />
      </div>
    </div>
  );
}

export default NewTask;
