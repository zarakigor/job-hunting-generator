import { useContext } from "react";
import { Context } from "./Context";

function EditModal(props) {
  const { isDark, setIsDark, handleDelete, setIsSaving } = useContext(Context);
  const {
    copiedJob,
    setCopiedJob,
    handleSaveEdit,
    handleModalView,
    closeModal,
  } = props;

  function handleEdit(event) {
    const { name, value, type, checked } = event.target;
    setCopiedJob((prevJob) => {
      return {
        ...prevJob,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="EditContainer">
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <form>
        <label>
          Job Title:{" "}
          <input
            type="text"
            name="title"
            onChange={handleEdit}
            value={copiedJob.title}
          />
        </label>
        <label>
          Company/Institution:{" "}
          <input
            type="text"
            name="company"
            onChange={handleEdit}
            value={copiedJob.company}
          />
        </label>
        <label>
          Salary:{" "}
          <input
            type="number"
            name="salary"
            onChange={handleEdit}
            value={copiedJob.salary}
          />
        </label>
        <label>
          Currency:{" "}
          <select
            name="currency"
            onChange={handleEdit}
            value={copiedJob.currency}
          >
            <option value=""></option>
            <option value="£">Sterlin</option>
            <option value="$">Dolar</option>
            <option value="€">Euro</option>
            <option value="₺">Türk Lirası</option>
          </select>
        </label>
        <label>
          Job Flexibility:{" "}
          <select
            name="flexibility"
            onChange={handleEdit}
            value={copiedJob.flexibility}
          >
            <option value=""></option>
            <option value="In Office">In Office</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <label>
          Job Type:{" "}
          <input
            type="text"
            name="type"
            onChange={handleEdit}
            value={copiedJob.type}
            placeholder="Contract,permanent,volunteer etc."
          />
        </label>
        <label>
          Website/URL:
          <input
            type="url"
            name="url"
            onChange={handleEdit}
            value={copiedJob.url}
            placeholder="https://example.com"
          />
        </label>
        <label>
          Applied:{" "}
          <input
            type="checkbox"
            name="applied"
            onChange={handleEdit}
            checked={copiedJob.applied}
          />
        </label>
        <label>
          Application Date{" "}
          <input
            type="date"
            name="date"
            onChange={handleEdit}
            value={copiedJob.date}
          />
        </label>
        <label>
          Additional Information:
          <textarea
            type="text"
            name="extraInfo"
            onChange={handleEdit}
            value={copiedJob.extraInfo}
          ></textarea>
        </label>
      </form>
      <button onClick={closeModal}>Close</button>
      <button
        onClick={() => {
          handleModalView();
          setIsSaving(false);
        }}
      >
        Stop Editing
      </button>
      <button onClick={handleSaveEdit}>Save Changes</button>
      <button onClick={() => setIsDark(!isDark)}>applied</button>
      <button
        onClick={() => {
          handleDelete(props.id);
          closeModal();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default EditModal;
