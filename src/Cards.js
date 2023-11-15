import { useState, useContext, useEffect } from "react";
import { Context } from "./Context";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Cards(props) {
  const { list, setList, isDark, setIsDark, handleDelete } =
    useContext(Context);
  const [copiedJob, setCopiedJob] = useState({ ...props.details });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  let subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    if (!isSaving) {
      setCopiedJob({ ...props.details });
    }
    setIsEditing(false);
    setModalIsOpen(false);
    setIsSaving(false);
  }

  function handleEdit(event) {
    const { name, value, type, checked } = event.target;
    setCopiedJob((prevJob) => {
      return {
        ...prevJob,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  //handle translation between editing job and viewing details of the job
  function handleModalView() {
    setIsEditing(!isEditing);
  }

  function handleSaveEdit(event) {
    setIsSaving(true);
    let temp = list;
    temp.map((element, index) => {
      if (props.id === element.id) {
        temp[index] = copiedJob;
        setList(temp);
        localStorage.setItem("items", JSON.stringify([...list]));
      }
    });
  }

  //propsları copiede çevir
  return (
    <div className="card" id={props.id}>
      <h4>
        Title:<span>{copiedJob.title}</span>
      </h4>
      <h4>
        Company:<span>{copiedJob.company}</span>
      </h4>
      <h4>
        Salary:<span>{props.details.salary}</span>
      </h4>
      <h4>
        Date:<span>{copiedJob.date}</span>
      </h4>
      <h4>
        Currency:<span>{copiedJob.currency}</span>
      </h4>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={() => handleDelete(props.id)}>Delete Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {!isEditing ? (
          <div>
            <h2>{copiedJob.title}</h2>
            <button onClick={handleModalView}>Editi aç</button>
          </div>
        ) : (
          <div>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  onChange={handleEdit}
                  value={copiedJob.title}
                />
              </label>
            </form>
            <button onClick={closeModal}>Close</button>
            <button onClick={handleModalView}>Stop Editing</button>
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
        )}
      </Modal>
    </div>
  );
}

export default Cards;
