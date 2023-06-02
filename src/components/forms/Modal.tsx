import AddNewTaskForm from "./AddNewTaskForm";
import "../../styles/modal.css";

type Props = {
  setIsModalOpen: any;
};

const Modal = ({ setIsModalOpen }: Props) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default Modal;
