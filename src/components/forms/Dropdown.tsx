import { useField } from "formik";

type Props = {
  currentColumns: any;
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ currentColumns, name, isOpen, setIsOpen }: Props) => {
  const [, , helpers] = useField(name);

  const { setValue } = helpers;
  return (
    <>
      {isOpen && (
        <div className="status-list" onClick={() => setIsOpen((prev) => !prev)}>
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
