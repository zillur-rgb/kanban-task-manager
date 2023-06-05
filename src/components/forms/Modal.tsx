import "../../styles/modal.css";
import { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import ViewTask from "../operations/ViewTask";
import Delete from "../operations/Delete";
import TaskForm from "./TaskForm";
import BoardForm from "./BoardForm";
import { CopyContext } from "../../App";

const Modal = () => {
  const ref = useRef(null);

  const { selectedTask, setSelectedTask, isModalOpen, setIsModalOpen } =
    useContext(CopyContext);

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
        {isModalOpen === "task_form" && (
          <TaskForm setIsModalOpen={setIsModalOpen} />
        )}

        {isModalOpen === "add_new_board" && (
          <BoardForm setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen === "edit_board_form" && (
          <BoardForm setIsModalOpen={setIsModalOpen} />
        )}

        {isModalOpen === "delete" && (
          <Delete setIsModalOpen={setIsModalOpen} selectedTask={selectedTask} />
        )}
      </div>
    </div>
  );
};

export default Modal;
