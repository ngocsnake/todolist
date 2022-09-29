import { useState } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Task({
  info,
  handleCheckTask,
  handleRemoveTask,
  handleImportantClick,
  handleEditTask,
}) {
  const [hasFocus, setFocus] = useState(false);

  const [stCpn, setStCpn] = useState(false);

  const [taskEdit, setTaskEdit] = useState(info.name);

  const confirm = () => {
    confirmAlert({
      title: "Xóa ghi chú.",
      message: "Hành động này không thể hoàn tác!!!",
      buttons: [
        {
          label: "Xóa",
          onClick: () => handleRemoveTask(info.id),
        },
        {
          label: "Hủy",
        },
      ],
    });
  };

  return (
    <div
      className="task"
      onDoubleClick={(e) => {
        setStCpn(!stCpn);
        handleCheckTask(info.id);
        e.target.blur();
        e.target.selectionStart = e.target.selectionEnd;
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className={info.isCompleted ? "taskCheck done" : "taskCheck"}
          onClick={() => {
            setStCpn(!stCpn);
            handleCheckTask(info.id);
          }}
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
        >
          {hasFocus ? (
            <i className="fas fa-check" style={{ fontSize: "8px" }}></i>
          ) : info.isCompleted ? (
            <i className="fas fa-check" style={{ fontSize: "8px" }}></i>
          ) : null}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          {info.isCompleted ? (
            <s style={{ color: "#AAAAAA" }}>{info.name}</s>
          ) : (
            <input
              value={taskEdit}
              className="inputT"
              onChange={(e) => {
                setTaskEdit(e.target.value);
              }}
              onBlur={() => {
                if (info.name !== taskEdit) {
                  handleEditTask(info.id, taskEdit);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (info.name !== taskEdit) {
                    handleEditTask(info.id, taskEdit);
                  }

                  event.target.blur();
                }
              }}
            ></input>
          )}
        </div>
        <div style={{ height: "100%", display: "flex", gap: "0 15px" }}>
          <div>
            <i
              className="far fa-trash-alt"
              onClick={() => {
                confirm();
              }}
            ></i>
          </div>
          <div>
            <i
              className={info.important ? "fas fa-star" : "fal fa-star"}
              onClick={() => {
                handleImportantClick(info.id);
                setStCpn(!stCpn);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
