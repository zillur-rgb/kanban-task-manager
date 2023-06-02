import AddNewTaskForm from "./AddNewTaskForm";
import "../../styles/modal.css";
import { useRef } from "react";
import { useClickAway } from "react-use";
import ViewTask from "../ViewTask";

type Props = {
  setIsModalOpen: any;
  selectedTask: any;
  setSelectedTask: any;
};

const Modal = ({ setIsModalOpen, selectedTask, setSelectedTask }: Props) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    console.log("Hello hello");
    setIsModalOpen(false);
    setSelectedTask({});
    setIsModalOpen(false);
  });
  return (
    <div className="modal-background">
      <div className="modal" ref={ref}>
        {selectedTask?.title && <ViewTask selectedTask={selectedTask} />}
        {!selectedTask?.title && (
          <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default Modal;
