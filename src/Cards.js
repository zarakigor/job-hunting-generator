import { useState, useContext } from "react";
import { Context } from "./Context";
import Modal from "react-modal";
import EditModal from "./EditModal";

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
  const { list, setList, handleDelete, isSaving, setIsSaving } =
    useContext(Context);
  const [copiedJob, setCopiedJob] = useState({ ...props.details });
  const [isEditing, setIsEditing] = useState(false);

  //let subtitle;
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
        Title:<span> {copiedJob.title}</span>
      </h4>
      <h4>
        Company:<span> {copiedJob.company}</span>
      </h4>
      <h4>
        Salary:<span> {copiedJob.salary}</span>
        <span> {copiedJob.currency}</span>
      </h4>
      <h4>
        Date:<span> {copiedJob.date}</span>
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
            <h2>Title: {copiedJob.title}</h2>
            <h2>Company: {copiedJob.company}</h2>
            <button onClick={handleModalView}>Editi aç</button>
          </div>
        ) : (
          <EditModal
            copiedJob={copiedJob}
            setCopiedJob={setCopiedJob}
            id={props.id}
            closeModal={closeModal}
            handleModalView={handleModalView}
            handleSaveEdit={handleSaveEdit}
          />
        )}
      </Modal>
    </div>
  );
}

export default Cards;
