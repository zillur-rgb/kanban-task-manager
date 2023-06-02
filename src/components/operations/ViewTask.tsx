import { useEffect, useState } from "react";
import { ISubtasks, ITasks } from "../../types/boards";
import checkIcon from "../../assets/icon-check.svg";
import dots from "../../assets/icon-vertical-ellipsis.svg";
import SmallDropdown from "./SmallDropdown";

type Props = {
  selectedTask: ITasks;
  setIsModalOpen?: (e: string | boolean) => void;
};

const ViewTask = ({ selectedTask, setIsModalOpen }: Props) => {
  const [amountOfCompletion, setAmountOfCompletion] = useState<number>(0);

  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    setAmountOfCompletion(
      selectedTask.subtasks.filter(
        (item: ISubtasks) => item.isCompleted === true
      ).length
    );
  }, [selectedTask]);

  return (
    <div className="view-task-content">
      <div className="view-task-title">
        <h1>{selectedTask.title}</h1>
        <img
          src={dots}
          alt="dots"
          onClick={() => setShowDropDown((prev) => !prev)}
        />

        {showDropDown && (
          <SmallDropdown
            name="Task"
            setShowDropDown={setShowDropDown}
            selectedTask={selectedTask}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
      <h3>{selectedTask.description}</h3>

      <div>
        <h4>
          Subtasks ({amountOfCompletion} of {selectedTask.subtasks.length})
        </h4>
        {selectedTask.subtasks.map((task) => (
          <div
            className={`subtask ${task.isCompleted && "line-through"}`}
            key={task.title}
          >
            {!task.isCompleted ? (
              <div className="not-completed"></div>
            ) : (
              <img
                src={checkIcon}
                alt="checkIcon"
                className={task.isCompleted ? "completed" : "not-completed"}
              />
            )}

            {task.title}
          </div>
        ))}
      </div>

      <h4>Current Status</h4>
    </div>
  );
};

export default ViewTask;
