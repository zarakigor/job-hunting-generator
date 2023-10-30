import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
function App() {
  const [storedList, setStoredList] = useState([]);

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
    setStoredList([...storedList, job]);
    reset();
  }

  return (
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
  );
}

export default App;
