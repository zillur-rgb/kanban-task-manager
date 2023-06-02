import { useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { Field, Form, Formik } from "formik";
import "../../styles/form.css";

type Props = {
  setIsModalOpen: any;
};
interface IInitialValues {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
}

const AddNewTaskForm = ({ setIsModalOpen }: Props) => {
  const [subTaskAmount, setSubTaskAmount] = useState<number>(2);

  const initialValues: IInitialValues = {
    title: "",
    description: "",
    subtasks: [],
    status: "",
  };
  return (
    <>
      <h1>Add New Task</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Submitted values", values);
          setIsModalOpen(false);
        }}
      >
        <Form className="form">
          <div className="field-wrapper">
            <label htmlFor="title">Title</label>
            <Field className="input" name="title" />
          </div>

          <div className="field-wrapper">
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              as="textarea"
              className="inout textarea"
            />
          </div>

          <div className="field-wrapper">
            <label htmlFor="subtasks">Subtasks</label>
            {Array.from(Array(subTaskAmount)).map((_, index) => (
              <div className="subtask-item" key={index}>
                <Field
                  placeholder="e.g. Complete wireframe"
                  name={`subtasks[${index}].name`}
                  className="input"
                />

                <img
                  src={cross}
                  alt="remove"
                  onClick={() => setSubTaskAmount((prev) => (prev -= 1))}
                />
              </div>
            ))}

            <button
              className="new-subtask"
              onClick={() => setSubTaskAmount((prev) => (prev += 1))}
            >
              + Add New Subtask
            </button>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default AddNewTaskForm;
