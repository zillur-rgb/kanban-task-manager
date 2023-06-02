import { useContext, useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { Field, Form, Formik } from "formik";
import "../../styles/form.css";
import { CopyContext } from "../../App";

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
  const [subTaskAmount, setSubTaskAmount] = useState<number>(1);

  const { currentColumns, setCurrentColumns } = useContext(CopyContext);

  const initialValues: IInitialValues = {
    title: "",
    description: "",
    subtasks: [],
    status: "Todo",
  };
  return (
    <>
      <h1>Add New Task</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.subtasks.map((task: any) => (task.isCompleted = false));

          let index = Object.entries(currentColumns).findIndex(
            ([id, column]: [any, any]) => column.name === values.status && id
          );

          let newTasksArray = [...currentColumns[index].tasks, { ...values }];

          setCurrentColumns({
            ...currentColumns,
            [index]: {
              ...currentColumns[index],
              tasks: newTasksArray,
            },
          });
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
              className="input textarea"
            />
          </div>

          <div className="field-wrapper">
            <label htmlFor="subtasks">Subtasks</label>
            {Array.from(Array(subTaskAmount)).map((_, index) => (
              <div className="subtask-item" key={index}>
                <Field
                  placeholder="e.g. Complete wireframe"
                  name={`subtasks[${index}].title`}
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
              type="button"
              className="button"
              onClick={() => setSubTaskAmount((prev) => (prev += 1))}
            >
              + Add New Subtask
            </button>
          </div>

          <div className="field-wrapper">
            <label htmlFor="status">Status</label>
          </div>

          <button type="submit" className="button submit">
            Create Task
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AddNewTaskForm;
