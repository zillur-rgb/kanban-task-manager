import AddNewTaskForm from "./AddNewTaskForm";
import "../../styles/modal.css";
import { useRef } from "react";
import { useClickAway } from "react-use";
import ViewTask from "../operations/ViewTask";
import NewBoard from "./NewBoard";
import Delete from "../operations/Delete";

type Props = {
  isModalOpen: boolean | string;
  setIsModalOpen: any;
  selectedTask: any;
  setSelectedTask: any;
};

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  setSelectedTask,
}: Props) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setSelectedTask({});
    setIsModalOpen(false);
  });
  return (
    <div className="modal-background">
      <div className="modal" ref={ref}>
        {isModalOpen === "view_task" && (
          <ViewTask
            selectedTask={selectedTask}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {isModalOpen === "add_new_task" && (
          <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
        )}

        {isModalOpen === "add_new_board" && (
          <NewBoard setIsModalOpen={setIsModalOpen} />
        )}

        {isModalOpen === "delete" && (
          <Delete setIsModalOpen={setIsModalOpen} selectedTask={selectedTask} />
        )}
      </div>
    </div>
  );
};

export default Modal;
