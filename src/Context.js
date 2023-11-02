import React, { useState, useEffect, createContext } from "react";
import { nanoid } from "nanoid";

const Context = createContext();

function ContextProvider({ children }) {
  const storedList = JSON.parse(localStorage.getItem("items"));
  const [list, setList] = useState(storedList);

  const [job, setJob] = useState({
    id: nanoid(),
    title: "",
    company: "",
    salary: "",
    applied: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setJob((prevJob) => {
      return {
        ...prevJob,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(storedList));
  }, [storedList]);

  function reset() {
    setJob({
      id: nanoid(),
      title: "",
      company: "",
      salary: "",
      applied: false,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(job);
    setList([...list, job]);
    reset();
  }

  return (
    <Context.Provider
      value={{
        list,
        job,
        setJob,
        handleChange,
        handleSubmit,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
