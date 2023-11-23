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
      <form className="FormContainer" onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={job.title}
          />
        </label>
        <label>
          Company/Institution:
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
            type="number"
            name="salary"
            onChange={handleChange}
            value={job.salary}
          />
        </label>
        <label>
          Currency:
          <select value={job.currency} name="currency" onChange={handleChange}>
            <option value=""></option>
            <option value="£">Sterlin</option>
            <option value="$">Dolar</option>
            <option value="€">Euro</option>
            <option value="₺">Türk Lirası</option>
          </select>
        </label>
        <label>
          Job Flexibility:
          <select
            value={job.flexibility}
            name="flexibility"
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="In Office">In Office</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <label>
          Job Type:
          <input
            type="text"
            name="type"
            onChange={handleChange}
            value={job.type}
            placeholder="Contract,permanent,volunteer etc."
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
          Application Date
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={job.date}
          />
        </label>
        <label>
          Additional Information:
          <textarea
            type="text"
            name="extraInfo"
            value={job.extraInfo}
            onChange={handleChange}
            rows={3}
            cols={40}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
      <div className="CardContainer">{cardElements}</div>
    </div>
  );
}

export default App;

// job type a silik hatırlatıcı ekle
// editcontainer ve viewcontainer ı 2 ayrı elemente .js ye böl
