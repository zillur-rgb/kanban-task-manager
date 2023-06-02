import React from "react";

type Props = {
  name: string;
};

const Delete = ({ name }: Props) => {
  const boardDeletion = `Ar you sure you want to delete the '${name}'? This action will remove all columns and tasks and cannot be undone!`;

  const taskDeletion = `Are you sure you want to delete the '${name}' tasks and its subtasks? This action cannot be undone!`;
  return (
    <div className="delete modal">
      <h1>Delete this {name}?</h1>
      <p>{name === "board" ? boardDeletion : taskDeletion}</p>

      <div>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Delete;
