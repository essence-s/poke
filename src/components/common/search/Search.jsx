import React, { useEffect, useReducer, useRef, useState } from "react";
import "./search.css";
import searchsvg from "./files/search.svg";
const Search = ({ data = [], result, className, ...others }) => {
  let searchRef = useRef();
  let [boxCoincidences, setBoxCoincidences] = useState(false);
  let [send, setSend] = useState(false);

  let dataToDeliver = {
    search: "",
    coincidences: [],
  };

  let reducer = (state, action) => {
    switch (action.type) {
      case "SET_SEARCH":
        console.log(action.payload);
        return { ...state, search: action.payload };
      case "SET_COINCIDENCES":
        return { ...state, coincidences: action.payload };
      case "SEND":
        setSend(true);
        if (state.search === "") return { ...state, coincidences: [] };

        return { ...state };
      default:
        return { ...state };
    }
  };

  let [state, dispatch] = useReducer(reducer, dataToDeliver);

  let getResult = async (e) => {
    setBoxCoincidences(true);
    let regex = new RegExp(`^${e}`, "i");
    let resultCoincidences = data.filter((r) => {
      return regex.test(r.name);
    });
    return resultCoincidences;
  };

  let onChange = (t) => {
    dispatch({ type: "SET_SEARCH", payload: t });
    if (!t) {
      dispatch({ type: "SEND" });
      return;
    }
    getResult(t).then((d) => {
      dispatch({ type: "SET_COINCIDENCES", payload: d });
    });
  };

  let onReplace = (data) => {
    dispatch({ type: "SET_SEARCH", payload: data });
    getResult(data).then((d) => {
      searchRef.current.querySelector(".search__input").focus();
      dispatch({ type: "SET_COINCIDENCES", payload: d });
      dispatch({ type: "SEND" });
      setBoxCoincidences(false);
    });
  };

  let onSubmitForm = (e) => {
    e.preventDefault();
    dispatch({ type: "SEND" });
    setBoxCoincidences(false);
  };

  useEffect(() => {
    // console.log(send);
    if (send) {
      result(state);
      setSend(false);
    }
  }, [send]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (searchRef.current.contains(e.target)) {
        setBoxCoincidences(true);
      } else {
        setBoxCoincidences(false);
      }
    });
  }, []);

  return (
    <form
      ref={searchRef}
      className={`search ${className}`}
      {...others}
      onSubmit={(e) => onSubmitForm(e)}
    >
      <input
        className="search__input"
        type="text"
        placeholder="Pokemon"
        value={state.search}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search__button">
        <img className="search__img" src={searchsvg} alt="search" />
      </button>

      <div className="search__coincidences">
        {boxCoincidences &&
          state.search &&
          (state.coincidences.length > 0 ? (
            state.coincidences.map((r, i) => (
              <p key={i} onClick={() => onReplace(r.name)}>
                {r.name}
              </p>
            ))
          ) : (
            <p>sin resultados</p>
          ))}
      </div>
    </form>
  );
};

export default Search;
