import React, { useState, createContext, useEffect } from "react";
import { nanoid } from "nanoid";

const Context = createContext();

function ContextProvider({ children }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("items"));
    if (storedJobs) {
      setList(storedJobs);
    }
  }, []);

  const [isDark, setIsDark] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [job, setJob] = useState({
    id: nanoid(),
    title: "",
    company: "",
    salary: "",
    currency: "",
    flexibility: "",
    type: "",
    website: "",
    date: "",
    applied: false,
    extraInfo: "",
  });

  // changes values in forms
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setJob((prevJob) => {
      return {
        ...prevJob,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function reset() {
    setJob({
      id: nanoid(),
      title: "",
      company: "",
      salary: "",
      currency: "",
      flexibility: "",
      type: "",
      website: "",
      date: "",
      applied: false,
      extraInfo: "",
    });
  }

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  function handleSubmit(event) {
    event.preventDefault();
    setList([...list, job]);
    localStorage.setItem("items", JSON.stringify([...list, job]));
    reset();
  }

  function handleDelete(id) {
    let temp = list;
    temp.map((element, index) => {
      if (id === element.id) {
        temp.splice(index, 1);
        setList(temp);
        localStorage.setItem("items", JSON.stringify([...list]));
      }
    });
    reset();
  }
  return (
    <Context.Provider
      value={{
        list,
        setList,
        job,
        setJob,
        handleChange,
        handleSubmit,
        reset,
        isDark,
        setIsDark,
        handleDelete,
        isSaving,
        setIsSaving,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
