import { useContext } from "react";
import { Context } from "./Context";
import Cards from "./Cards";

function App() {
  const { list, job, setJob, handleChange, handleSubmit } = useContext(Context);

  let cardElements = [];
  if (list && list.length > 0) {
    cardElements = list.map((job) => (
      <Cards id={job.id} key={job.id} details={job} />
    ));
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
        <label>
          Birthday:
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={job.date}
          />
        </label>
        <button>Submit</button>
      </form>
      <div className="CardContainer">{cardElements}</div>
    </div>
  );
}

export default App;
