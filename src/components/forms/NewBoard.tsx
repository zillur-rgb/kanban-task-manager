import { useContext, useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { Formik, Form, Field } from "formik";
import { CopyContext } from "../../App";

type Props = {
  setIsModalOpen: (e: string | boolean) => void;
};
const NewBoard = ({ setIsModalOpen }: Props) => {
  const [columnAmount, setColumnAmount] = useState<number>(1);

  const { setCopy } = useContext(CopyContext);
  return (
    <>
      <h1>Add New Board</h1>

      <Formik
        initialValues={{
          name: "",
          columns: [],
        }}
        onSubmit={(values: any) => {
          values.columns.map((col: any) => (col.tasks = []));
          setCopy((prevState: any) => [...prevState, values]);
          setIsModalOpen(false);
        }}
      >
        <Form className="form">
          <div className="field-wrapper">
            <label htmlFor="name">Board Name</label>
            <Field name="name" className="input" />
          </div>

          <div className="field-wrapper">
            <label htmlFor="name">Board Columns</label>
            {Array.from(Array(columnAmount)).map((_, index) => (
              <div className="subtask-item" key={index}>
                <Field
                  className="input"
                  placeholder="e.g. Todo"
                  name={`columns[${index}].name`}
                />

                <img
                  src={cross}
                  alt="cross"
                  onClick={() => setColumnAmount((prev) => (prev -= 1))}
                />
              </div>
            ))}
          </div>

          <button
            className="button"
            type="button"
            onClick={() => setColumnAmount((prev) => (prev += 1))}
          >
            + Add New Column
          </button>

          <button type="submit" className="button submit">
            Create New Board
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default NewBoard;
