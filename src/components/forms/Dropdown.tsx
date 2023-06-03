import { useField } from "formik";
import { useState } from "react";

type Props = {
  currentColumns: any;
  name: string;
};

const Dropdown = ({ currentColumns, name }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [, , helpers] = useField(name);

  const { setValue } = helpers;
  return (
    <div className="status-list" onClick={() => setIsOpen((prev) => !prev)}>
      {isOpen &&
        Object.values(currentColumns).map((column: any) => {
          return <div onClick={() => setValue(column.name)}>{column.name}</div>;
        })}
    </div>
  );
};

export default Dropdown;
