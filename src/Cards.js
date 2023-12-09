import { useState, useContext } from "react";
import { Context } from "./Context";
import Modal from "react-modal";
import EditModal from "./EditModal";

import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { FaBuilding } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

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
    temp.forEach((element, index) => {
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
      <h2>
        <GoPersonFill />
        <span> {copiedJob.title}</span>
      </h2>
      <h2>
        <FaBuilding />
        <span> {copiedJob.company}</span>
      </h2>
      <h2>
        <FaMoneyBill1Wave />
        <span> {copiedJob.salary}</span>
        <span> {copiedJob.currency}</span>
      </h2>
      <h2>
        <FaClock />
        <span> {copiedJob.date}</span>
      </h2>
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
            <h2>Job Title: {copiedJob.title}</h2>
            <h2>Company: {copiedJob.company}</h2>
            <h2>
              Salary:{copiedJob.salary}
              <span> {copiedJob.currency}</span>
            </h2>
            <h2>Job Flexibility:{copiedJob.flexibility}</h2>
            <h2>Job Type:{copiedJob.type}</h2>
            <h2>
              Website:<a href={copiedJob.url}>{copiedJob.url}</a>
            </h2>
            <h2>Application Date: {copiedJob.date}</h2>
            <h2>Additional Information: {copiedJob.extraInfo}</h2>
            <button onClick={handleModalView}>Edit</button>
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
