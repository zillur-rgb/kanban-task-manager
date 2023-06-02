import { useEffect, useState } from "react";
import { ISubtasks, ITasks } from "../types/boards";
import checkIcon from "../assets/icon-check.svg";

type Props = {
  selectedTask: ITasks;
};

const ViewTask = ({ selectedTask }: Props) => {
  const [amountOfCompletion, setAmountOfCompletion] = useState<number>(0);
  console.log("selectedTask", selectedTask);

  useEffect(() => {
    setAmountOfCompletion(
      selectedTask.subtasks.filter(
        (item: ISubtasks) => item.isCompleted === true
      ).length
    );
  }, [selectedTask]);

  return (
    <div className="view-task-content">
      <h1>{selectedTask.title}</h1>
      <h3>{selectedTask.description}</h3>

      <div>
        <h4>
          Subtasks ({amountOfCompletion} of {selectedTask.subtasks.length})
        </h4>
        {selectedTask.subtasks.map((task) => (
          <div className={`subtask ${task.isCompleted && "line-through"}`}>
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
