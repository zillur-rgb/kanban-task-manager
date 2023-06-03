import { useField } from "formik";
import { useRef } from "react";
import { useClickAway } from "react-use";

type Props = {
  currentColumns: any;
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ currentColumns, name, isOpen, setIsOpen }: Props) => {
  const [, , helpers] = useField(name);

  const ref = useRef(null);

  const { setValue } = helpers;

  useClickAway(ref, () => setIsOpen(false));
  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="status-list"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {Object.values(currentColumns).map((column: any) => {
            return (
              <div onClick={() => setValue(column.name)}>{column.name}</div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dropdown;
