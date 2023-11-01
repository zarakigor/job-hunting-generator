import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Cards from "./Cards";

function App() {
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

  const cardElements = list.map((job) => (
    <Cards id={job.id} key={job.id} info={job} />
  ));

  function handleSubmit(event) {
    event.preventDefault();
    console.log(job);
    setList([...list, job]);
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={job.title}
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            onChange={handleChange}
            value={job.company}
          />
        </label>
        <label>
          Salary:
          <input
            type="text"
            name="salary"
            onChange={handleChange}
            value={job.salary}
          />
        </label>
        <label>
          Applied:
          <input
            type="checkbox"
            name="applied"
            onChange={handleChange}
            checked={job.applied}
          />
        </label>
        <button>Submit</button>
      </form>
      <div className="CardContainer">{cardElements}</div>
    </div>
  );
}

export default App;
