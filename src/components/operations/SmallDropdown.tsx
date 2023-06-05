import { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import "../../styles/dropdown.css";
import { CopyContext } from "../../App";

type Props = {
  name: string;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask?: any;
  setIsModalOpen: any;
};

const SmallDropdown = ({ name, setShowDropDown }: Props) => {
  const ref = useRef(null);

  const { selectedTask, setIsModalOpen } = useContext(CopyContext);

  useClickAway(ref, () => {
    setShowDropDown(false);
  });

  const handleDelete = () => {
    setIsModalOpen("delete");
  };

  const handleEdit = () => {
    if (name === "Task") {
      setIsModalOpen("task_form");
    } else {
      setIsModalOpen("edit_board_form");
    }

    setShowDropDown(false);
  };
  return (
    <div
      className={`small-dp-container ${name === "Board" && "board"}`}
      ref={ref}
    >
      <div onClick={handleEdit}>Edit {name}</div>
      <div onClick={handleDelete}>Delete {name}</div>
    </div>
  );
};

export default SmallDropdown;
