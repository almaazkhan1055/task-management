import React, { useContext, useEffect, useState } from "react";
import styles from "./allTasks.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import NavBar from "@/components/navBar";
import { ref, get, set, remove, getDatabase } from "firebase/database";
import { UserDataContext } from "@/context/useContext";
import { useRouter } from "next/router";

const AllTasks = ({ sendData }) => {
  const [alltasks, setAllTask] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssignee, setEditAssignee] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const { userData } = useContext(UserDataContext);
  // console.log("userDatahghfhfhgf", userData);

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setEmailValue(userData.email);
      fetchTasks();
    } else {
      router.push("/login");
    }
  }, []);

  const db = getDatabase();
  const fetchTasks = async () => {
    // console.log("fetchTasks", fetchTasks);
    try {
      const dbRef = ref(db, "taskRecord");
      // console.log(dbRef);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const tasksList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAllTask(tasksList);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (index, e) => {
    const newStatus = [...taskStatus];
    newStatus[index] = e.target.value;
    setTaskStatus(newStatus);
    localStorage.setItem("taskStatus", JSON.stringify(newStatus));
  };

  const removeTask = async (taskId) => {
    try {
      console.log("removeTask", taskId);
      const taskRef = ref(db, `taskRecord/${taskId}`);
      await remove(taskRef);
      setAllTask(alltasks.filter((task) => task.id !== taskId));
      console.log("Task removed successfully");
    } catch (error) {
      console.error("Error removing task: ", error);
    }
  };

  const editTask = (index) => {
    setEditingIndex(index);
    const task = alltasks[index];
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditAssignee(task.assignee);
    }
  };

  const saveEditedTask = async (index, taskId) => {
    const updatedTasks = [...alltasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      title: editTitle,
      description: editDescription,
      assignee: editAssignee,
    };
    setAllTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    try {
      const taskRef = ref(db, `taskRecord/${taskId}`);
      console.log(taskId);
      await set(taskRef, {
        title: editTitle,
        description: editDescription,
        assignee: editAssignee,
      });
      console.log("Task edited successfully");
    } catch (error) {
      console.error("Error editing task: ", error);
    }

    setEditingIndex(-1);
  };

  // useEffect(() => {
  //   const tasks = localStorage.getItem("tasks");
  //   const alltasks = JSON.parse(tasks) || [];
  //   setAllTask(alltasks);

  //   const storedTaskStatus = localStorage.getItem("taskStatus");
  //   if (storedTaskStatus) {
  //     setTaskStatus(JSON.parse(storedTaskStatus));
  //   } else {
  //     const initialStatus = alltasks.map(() => "");
  //     setTaskStatus(initialStatus);
  //   }
  //   const userEmail = JSON.parse(localStorage.getItem("loginUser"));
  //   if (userEmail) {
  //     setEmailValue(userEmail.email);
  //   }
  // }, []);

  return (
    <>
      <NavBar />
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
        }}
        className="px-5 py-10"
      >
        All Tasks
      </h1>
      <h1>Welcome: {emailValue}</h1>
      <div className={styles.mainAllTask}>
        {alltasks.map((task, index) => {
          return (
            <>
              <section className={styles.allTaskSection} key={task.id}>
                {editingIndex === index ? (
                  <>
                    <div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={editAssignee}
                        onChange={(e) => setEditAssignee(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className={styles.font}>Task Title :</span>
                      <span className={styles.fontChild}>
                        {task ? task.title : ""}
                      </span>
                    </div>
                    <div>
                      <span className={styles.font}>Task Description :</span>
                      <span className={styles.fontChild}>
                        {task ? task.description : ""}
                      </span>
                    </div>
                    <div>
                      <span className={styles.font}>Task assigned to :</span>
                      <span className={styles.fontChild}>
                        {task ? task.assignee : ""}
                      </span>
                    </div>
                  </>
                )}
                <select
                  className={styles.select}
                  onChange={(e) => handleChange(index, e)}
                  value={taskStatus[index] || ""}
                  name="taskSelect"
                  id="taskSelect"
                >
                  <option value="">Select status</option>
                  <option value="Start">Start</option>
                  <option value="in Progress">in Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <h1 className={styles.font}>Status:{taskStatus[index]}</h1>
                {editingIndex === index ? (
                  <button onClick={() => saveEditedTask(index, task.id)}>
                    Save
                  </button>
                ) : (
                  <div className="buttons">
                    <button onClick={() => removeTask(task.id)}>
                      <MdOutlineDelete className="deleteBtn" />
                    </button>
                    <button onClick={() => editTask(index)}>
                      <FaRegEdit className="editBtn" />
                    </button>
                  </div>
                )}
              </section>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllTasks;
