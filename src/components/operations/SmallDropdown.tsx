import { useRef } from "react";
import { useClickAway } from "react-use";
import "../../styles/dropdown.css";

type Props = {
  name: string;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask?: any;
  setIsModalOpen: any;
};

const SmallDropdown = ({ name, setShowDropDown, setIsModalOpen }: Props) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowDropDown(false);
  });

  console.log("Hello hello");

  const handleDelete = () => {
    // first find the column that the current selectedTask lives in
    // let taskInColumn: any = Object.values(currentColumns).find(
    //   (col: any) => col.name === selectedTask.status
    // );
    // // remove it and return us a new array
    // let updatedTaskArray = taskInColumn.tasks.filter(
    //   (item: any) => item.key !== selectedTask.key
    // );
    // console.log(currentColumns, "current columns");
    // console.log(taskInColumn, "the task in the current column");
    // console.log(updatedTaskArray, "the updated column");
    setIsModalOpen("delete");
  };
  return (
    <div
      className={`small-dp-container ${name === "Board" && "board"}`}
      ref={ref}
    >
      <div>Edit {name}</div>
      <div onClick={handleDelete}>Delete {name}</div>
    </div>
  );
};

export default SmallDropdown;
