import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import Cards from "./Cards";

function App() {
  const AppContext = useContext(Context);

  const { list, job, setJob, handleChange, handleSubmit, reset } =
    useContext(Context);

  const cardElements = list.map((job) => (
    <Cards id={job.id} key={job.id} info={job} />
  ));

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
