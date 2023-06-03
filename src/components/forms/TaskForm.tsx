import { useContext, useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { Field, Form, Formik, FormikProps } from "formik";
import "../../styles/form.css";
import { CopyContext } from "../../App";
import Dropdown from "./Dropdown";

type Props = {
  setIsModalOpen: any;
};
interface IInitialValues {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
}

const TaskForm = ({ setIsModalOpen }: Props) => {
  const [subTaskAmount, setSubTaskAmount] = useState<number>(1);

  const { currentColumns, setCurrentColumns, selectedTask } =
    useContext(CopyContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues: IInitialValues = {
    title: "" || selectedTask.title,
    description: "" || selectedTask.description,
    subtasks: [] || selectedTask.subtasks,
    status: "Todo" || selectedTask.status,
  };

  let isSelectedTask = Object.entries(selectedTask).length ? false : true;
  return (
    <>
      <h1>{isSelectedTask ? "Add New Task" : "Edit Task"}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          // add isCompleted property to all subtasks
          values.subtasks.map((task: any) => (task.isCompleted = false));

          // find the index of the array that we adding to
          let index = Object.entries(currentColumns).findIndex(
            ([id, column]: [string, any]) => column.name === values.status && id
          );
          // copy the old tasks and add a new task into a new array
          let newTasksArray = [...currentColumns[index].tasks, { ...values }];

          // replace the currentColumns[index] so eg "Todos" array. With the newTaskArrays
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
        {(values: FormikProps<IInitialValues>) => (
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
                    className="remove-subtask"
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

            <div className="field-wrapper parent">
              <label htmlFor="status">Status</label>
              <Field
                className="input"
                value={values.values.status}
                name="status"
                onClick={() => setIsOpen(true)}
              />

              <Dropdown
                currentColumns={currentColumns}
                name="status"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>

            <button type="submit" className="button submit">
              {isSelectedTask ? "Create Task" : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
