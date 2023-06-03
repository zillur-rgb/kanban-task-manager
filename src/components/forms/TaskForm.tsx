import { useContext, useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import "../../styles/form.css";
import { CopyContext } from "../../App";
import Dropdown from "./Dropdown";
import { validationSchemaTask } from "../../lib/form-validation";

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
        validationSchema={validationSchemaTask}
        onSubmit={(values) => {
          // Get the index of the array that we modify
          let index = Object.entries(currentColumns).findIndex(
            ([id, column]: [string, any]) => column.name === values.status && id
          );

          if (isSelectedTask) {
            // add isCompleted property to all subtasks
            values.subtasks.map((task: any) => task.isCompleted === false);
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
          } else {
            // Find the one that we will edit and replace it
            const updatedArray = currentColumns[index].tasks.map((task: any) =>
              task.index === selectedTask.index ? { ...values } : task
            );

            setCurrentColumns({
              ...currentColumns,
              [index]: {
                ...currentColumns[index],
                tasks: updatedArray,
              },
            });
          }

          setIsModalOpen(false);
        }}
      >
        {(values: FormikProps<IInitialValues>) => (
          <Form className="form">
            <div className="field-wrapper">
              <label htmlFor="title">Title</label>
              <Field
                className="input"
                name="title"
                placeholder="e.g. Take coffee break"
                style={
                  values.errors.title && values.touched.title === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />
              <ErrorMessage
                name="title"
                component={"div"}
                className="error-message"
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                as="textarea"
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                className="input textarea"
                style={
                  values.errors.description &&
                  values.touched.description === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />

              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="subtasks">Subtasks</label>

              {/* If we edit a task */}
              {!isSelectedTask &&
                values.values.subtasks.map((item: any, index: number) => (
                  <div className="subtask-item" key={index}>
                    <Field
                      placeholder="e.g Make coffee"
                      name={`subtasks[${index}].title`}
                      className="input"
                      autocomplete="off"
                    />

                    <img
                      src={cross}
                      alt="cross"
                      onClick={() => console.log(item)}
                    />
                  </div>
                ))}
              {/* If we add a new task */}
              {isSelectedTask &&
                Array.from(Array(subTaskAmount)).map((_, index) => (
                  <div className="subtask-item" key={index}>
                    <Field
                      placeholder="e.g. Complete wireframe"
                      name={`subtasks[${index}].title`}
                      className="input"
                      autocomplete="off"
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
                autocomplete="off"
                style={
                  values.errors.status && values.touched.status === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />

              <ErrorMessage
                name="status"
                component="div"
                className="error-message"
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
