import { useContext } from "react";
import { Context } from "./Context";
import Cards from "./Cards";
import Excel from "./Excel";

function App() {
  const { list, job, handleChange, handleSubmit } = useContext(Context);

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
            <option value="£">Pound</option>
            <option value="$">Dollar</option>
            <option value="€">Euro</option>
            <option value="₺">Turkish Lira</option>
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
          Website/URL:
          <input
            type="url"
            name="url"
            onChange={handleChange}
            value={job.url}
            placeholder="https://example.com"
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
        <button className="SubmitButton">Submit</button>
      </form>
      <div className="CardContainer">{cardElements}</div>
      <Excel />
    </div>
  );
}

export default App;

// job type a silik hatırlatıcı ekle
// editcontainer ve viewcontainer ı 2 ayrı elemente .js ye böl
// cards.js deki ilk card kısmında başlıklar yerine logo ekle
// viewmodal margin-righy:auto yap
