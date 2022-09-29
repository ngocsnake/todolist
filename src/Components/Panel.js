import Task from "./Task";

import { useState, useEffect, useRef } from "react";
import uniqid from "uniqid";

function Panel({ tab, searchQuery, setOpenMenu }) {
  const currentTime = new Date().toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mp3 = useRef(new Audio("/Sound/completed.mp3"));

  const ref = useRef(null);

  const [inputFocus, setInputFocus] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState([]);

  const [tasksD, setTasksD] = useState([]);

  const [u, sU] = useState(false);

  const [pendingTaskShow, setPendingTaskShow] = useState(true);
  const [completedTaskShow, setCompletedTaskShow] = useState(true);

  const message = useRef("");

  useEffect(() => {
    setTasksD(
      tasks.filter(
        (task) =>
          task.name.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1
      )
    );

    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      return;
    }

    let result;

    switch (tab) {
      case "Myday":
        result = tasks.filter((g) => {
          const today = new Date().toLocaleDateString("en-US");

          const taskAddTime = new Date(g.addtime).toLocaleDateString("en-US");

          return today === taskAddTime;
        });
        message.current = "My day task is nothing";
        break;

      case "Important":
        result = tasks.filter((g) => g.important);
        message.current = "Important task is nothing";
        break;

      case "Pending":
        result = tasks.filter((g) => !g.isCompleted);
        message.current = "Pending task is nothing";
        break;

      case "Completed":
        result = tasks.filter((g) => g.isCompleted);
        message.current = "Completed task is nothing";
        break;

      default:
        message.current = "All task is nothing";
        result = tasks;
        break;
    }

    setTasksD(result);
    // eslint-disable-next-line
  }, [tasks, tab]);

  useEffect(() => {
    const gAT = getAllTask();
    setTasks(gAT);

    if (searchQuery !== "") {
      setTasksD(
        gAT.filter(
          (task) =>
            task.name.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1
        )
      );
    }
    // eslint-disable-next-line
  }, [u]);

  const getAllTask = () => {
    const items = JSON.parse(localStorage.getItem("items"))
      ? JSON.parse(localStorage.getItem("items"))
      : [];

    return items;
  };

  const handleCheckTask = (id) => {
    const task = tasks.find((task) => task.id === id);

    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      const audio = mp3.current;

      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.25;

      audio.play();
    }

    localStorage.setItem("items", JSON.stringify(tasks));
    sU(!u);
  };

  const handleRemoveTask = (id) => {
    const rm = tasks.filter((task) => {
      return task.id !== id;
    });

    localStorage.setItem("items", JSON.stringify(rm));
    sU(!u);
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      return;
    }

    tasks.push({
      id: uniqid(),
      name: taskInput.trim(),
      addtime: new Date().toString(),
      isCompleted: tab === "Completed",
      important: tab === "Important",
    });

    setTaskInput("");
    sU(!u);
    localStorage.setItem("items", JSON.stringify(tasks));
  };

  const handleImportantClick = (id) => {
    const task = tasks.find((task) => task.id === id);

    task.important = !task.important;

    localStorage.setItem("items", JSON.stringify(tasks));
    sU(!u);
  };

  const handleEditTask = (id, taskn) => {
    const task = tasks.find((task) => task.id === id);

    task.name = taskn;

    localStorage.setItem("items", JSON.stringify(tasks));
  };

  return (
    <div id="Panel">
      <div
        style={{ padding: "5px 0 15px 0" }}
        className="menubtn"
        onClick={() => {
          setOpenMenu((prev) => !prev);
        }}
      >
        <i class="far fa-bars"></i>
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="panel-title">My Day</div>
            <div className="panel-timer">{currentTime}</div>
          </div>
          <div style={{ display: "flex", gap: "0 15px" }}>
            {/* <div className="mbox">
              <i className="fal fa-expand-alt"></i>
            </div>
            <div className="mbox">
              <i className="fal fa-lightbulb"></i>
            </div> */}
            {/* <div className="mbox">
              <i className="far fa-ellipsis-h"></i>
              <div className="setting">
                <div className="setting-item">
                  <b>Sort by</b>
                  <div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
                <div className="setting-item">
                  <b>Theme</b>
                  <div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="mbox">
              <i className="far fa-wifi-slash"></i>
            </div>
          </div>
        </div>
        <div className="tasks">
          {tasksD.length !== 0 ? (
            <>
              {tasksD.filter((task) => task.isCompleted === false).length ? (
                <>
                  <div
                    className="taskgrouptitle"
                    onClick={() => {
                      setPendingTaskShow(!pendingTaskShow);
                    }}
                  >
                    <div>
                      Task •{" "}
                      {
                        tasksD.filter((task) => task.isCompleted === false)
                          .length
                      }
                    </div>
                    {pendingTaskShow ? (
                      <i className="far fa-chevron-down"></i>
                    ) : (
                      <i className="far fa-chevron-right"></i>
                    )}
                  </div>
                  {tasksD.length !== 0 && pendingTaskShow
                    ? tasksD.map((task) =>
                        task.isCompleted ? null : (
                          <Task
                            key={task.id}
                            info={task}
                            handleCheckTask={handleCheckTask}
                            handleRemoveTask={handleRemoveTask}
                            handleImportantClick={handleImportantClick}
                            handleEditTask={handleEditTask}
                          ></Task>
                        )
                      )
                    : ""}
                </>
              ) : null}

              {tasksD.filter((task) => task.isCompleted !== false).length ? (
                <>
                  <div
                    className="taskgrouptitle"
                    onClick={() => {
                      setCompletedTaskShow(!completedTaskShow);
                    }}
                  >
                    <div>
                      Completed •{" "}
                      {
                        tasksD.filter((task) => task.isCompleted !== false)
                          .length
                      }
                    </div>
                    {completedTaskShow ? (
                      <i className="far fa-chevron-down"></i>
                    ) : (
                      <i className="far fa-chevron-right"></i>
                    )}
                  </div>
                  {tasksD.length !== 0 && completedTaskShow
                    ? tasksD.map((task) =>
                        !task.isCompleted ? null : (
                          <Task
                            key={task.id}
                            info={task}
                            handleCheckTask={handleCheckTask}
                            handleRemoveTask={handleRemoveTask}
                            handleImportantClick={handleImportantClick}
                            handleEditTask={handleEditTask}
                          ></Task>
                        )
                      )
                    : ""}
                </>
              ) : null}
            </>
          ) : (
            <div style={{ padding: "20px 0" }}>
              {message.current}
              {"! "}
              <span
                style={{
                  color: "#228DD4",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  ref.current.focus();
                }}
              >
                add task?
              </span>
            </div>
          )}
        </div>

        <div className={inputFocus ? "task-input focus" : "task-input"}>
          <i
            className={
              inputFocus ? "fas fa-plus-circle focus" : "fas fa-plus-circle"
            }
            onClick={() => {
              handleAddTask();
            }}
          ></i>
          <input
            onFocus={() => {
              setInputFocus(true);
            }}
            onBlur={() => {
              setInputFocus(false);
            }}
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddTask();
              }
            }}
            ref={ref}
            placeholder="Try typing Learn ReactJS..."
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Panel;
