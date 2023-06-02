import { useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { Formik, Form, Field } from "formik";

const NewBoard = () => {
  const [columnAmount, setColumnAmount] = useState<number>(1);
  return (
    <>
      <h1>Add New Board</h1>

      <Formik
        initialValues={{
          name: "",
          columns: [],
        }}
        onSubmit={(values: { name: string; columns: any[] }) => {
          console.log("values", values);
        }}
      >
        <Form className="form">
          <div className="field-wrapper">
            <label htmlFor="name">Name</label>
            <Field name="name" className="input" />
          </div>

          <div className="field-wrapper">
            <label htmlFor="name">Name</label>
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
            className="new-subtask"
            onClick={() => setColumnAmount((prev) => (prev -= 1))}
          >
            + Add New Column
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default NewBoard;
