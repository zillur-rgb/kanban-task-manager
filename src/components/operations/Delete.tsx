import "../../styles/modal.css";
import { useContext } from "react";
import { CopyContext } from "../../App";

type Props = {
  selectedTask: any;
  setIsModalOpen: (str: string | boolean) => void;
};

const Delete = ({ selectedTask, setIsModalOpen }: Props) => {
  const {
    copy,
    setCopy,
    currentBoard,
    setCurrentBoard,
    setSelectedTask,
    currentColumns,
    setCurrentColumns,
  } = useContext(CopyContext);

  const boardDeletion = `Are you sure you want to delete the '${copy[currentBoard].name}'? This action will remove all columns and tasks and cannot be undone!`;

  // TODO: Check why selectedTask is empty
  const taskDeletion = `Are you sure you want to delete the '${
    selectedTask ? selectedTask.title : "title"
  }' tasks and its subtasks? This action cannot be undone!`;

  // check if are removing task or board, if we have selectedTask its a task
  // TODO: Check why selectedTask is empty
  const isTaskOrBoard =
    selectedTask && Object.entries(selectedTask).length !== 0
      ? "task"
      : "board";

  const handleDelete = () => {
    if (isTaskOrBoard === "task") {
      //first find the column that the current selectedTask lives in
      let columnOfSelectedTask: any = Object.values(currentColumns).find(
        (column: any) => column.name === selectedTask.status
      );

      // remove it and return us a new array
      let updatedTaskArray = columnOfSelectedTask.tasks.filter(
        (item: any) => item.key !== selectedTask.key
      );

      // Replace the old columns with the new ones
      setCurrentColumns({
        ...currentColumns,
        [selectedTask.key]: {
          ...currentColumns[selectedTask.key],
          tasks: updatedTaskArray,
        },
      });
    }

    if (isTaskOrBoard === "board") {
      // When we have a board
      setCopy(
        copy.filter((board: any) => board.name !== copy[currentBoard].name)
      );
      setCurrentBoard(0);
    }
    setIsModalOpen(false);
    setSelectedTask();
  };

  return (
    <div className="delete-modal">
      <h1>Delete this {isTaskOrBoard === "task" ? "Task" : "Board"}</h1>
      <p>{isTaskOrBoard === "task" ? taskDeletion : boardDeletion}</p>

      <div>
        <button className="button red" onClick={handleDelete}>
          Delete
        </button>
        <button
          onClick={() => {
            setIsModalOpen(false);
            setSelectedTask();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
