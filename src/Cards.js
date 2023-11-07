import { useState, useContext } from "react";
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
  //const { list, job, handleChange, handleSubmit } = useContext(Context);
  const [copiedJob, setCopiedJob] = useState({ ...props.details });

  //console.log(copiedJob);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    // save ve normal çıkış arasında farkı belirle. birinde resetle diğerinde kaydet
    setCopiedJob({ ...props.details });
    setIsOpen(false);
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

  return (
    <div className="card">
      <h4>
        Title:<span>{props.details.title}</span>
      </h4>
      <h4>
        Company:<span>{props.details.company}</span>
      </h4>
      <h4>
        Salary:<span>{props.details.salary}</span>
      </h4>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
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
        {/* <p>{copiedJob}</p> */}
      </Modal>
    </div>
  );
}

export default Cards;
