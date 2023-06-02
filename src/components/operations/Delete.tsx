import { ITasks } from "../../types/boards";
import "../../styles/modal.css";

type Props = {
  selectedTask: ITasks;
  setIsModalOpen: (str: string | boolean) => void;
};

const Delete = ({ selectedTask, setIsModalOpen }: Props) => {
  const boardDeletion = `Are you sure you want to delete the '${selectedTask.title}'? This action will remove all columns and tasks and cannot be undone!`;

  const taskDeletion = `Are you sure you want to delete the '${selectedTask.title}' tasks and its subtasks? This action cannot be undone!`;

  return (
    <div className="delete-modal">
      <h1>Delete this {selectedTask.title ? "Task" : "Board"}?</h1>
      <p>{selectedTask ? taskDeletion : boardDeletion}</p>

      <div>
        <button className="button red" onClick={() => setIsModalOpen(false)}>
          Delete
        </button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Delete;
