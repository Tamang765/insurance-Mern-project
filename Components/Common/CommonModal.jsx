import { Modal } from "react-bootstrap";


const CommonModal = ({show,clearCut,handleClose}) => {
  return (
    <div>
      {" "}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            className="border-2 p-2 mr-3 rounded-md bg-green-300"
            onClick={clearCut}
          >
            Confirm
          </button>

          <button
            className="border-2 p-2 mr-3 rounded-md bg-red-300"
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommonModal;
