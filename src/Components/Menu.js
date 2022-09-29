import { useState } from "react";

function Menu({ tab, handleActive, searchQuery, setSearchQuery }) {
  const [inputFocus, setInputFocus] = useState(false);

  const [query, setQuery] = useState("");

  return (
    <div id="Menu">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0 15px",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00ABA9",
            color: "white",
          }}
        >
          <i className="fas fa-user-slash"></i>
        </div>
        <div style={{ fontWeight: "600", cursor: "pointer" }}>Login</div>
      </div>

      <div className={inputFocus ? "searchInput focus" : "searchInput"}>
        <input
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
            setSearchQuery(query);
          }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSearchQuery(query);
            }
          }}
          placeholder="Search..."
        ></input>
        {inputFocus || query.length === 0 ? (
          <i
            className="far fa-search"
            onClick={() => {
              setSearchQuery(query);
            }}
          ></i>
        ) : (
          <i
            className="far fa-times"
            onClick={() => {
              setQuery("");
              setSearchQuery("");
            }}
          ></i>
        )}
      </div>

      <div className="nav">
        <div
          className={tab === "Myday" ? "nav-item active" : "nav-item"}
          onClick={() => handleActive("Myday")}
        >
          <i
            className="far fa-sun-cloud"
            style={{ fontSize: "15px", color: "#677BCB" }}
          ></i>
          <div>My Day</div>
        </div>
        <div
          className={tab === "Important" ? "nav-item active" : "nav-item"}
          onClick={() => handleActive("Important")}
        >
          <i className="far fa-star" style={{ color: "#AC395D" }}></i>
          <div>Important</div>
        </div>
        <div
          className={tab === "Pending" ? "nav-item active" : "nav-item"}
          onClick={() => handleActive("Pending")}
        >
          <i className="fas fa-spinner" style={{ color: "#E31E26" }}></i>
          <div>Pending</div>
        </div>
        <div
          className={tab === "Completed" ? "nav-item active" : "nav-item"}
          onClick={() => handleActive("Completed")}
        >
          <i
            className="far fa-check-circle"
            style={{ fontSize: "16px", color: "#00A300" }}
          ></i>
          <div>Completed</div>
        </div>
        <div
          className={tab === "All" ? "nav-item active" : "nav-item"}
          onClick={() => handleActive("All")}
        >
          <i className="far fa-infinity" style={{ fontSize: "13px" }}></i>
          <div>All</div>
        </div>
      </div>
      <div className="cpr">To do list ©️ Pham d. Ngoc</div>
    </div>
  );
}

export default Menu;
