import { useContext, useState } from "react";
import cross from "../../assets/icon-cross.svg";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikProps,
} from "formik";
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
  const { currentColumns, setCurrentColumns, selectedTask } =
    useContext(CopyContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("selectedTask", selectedTask);

  const initialValues: IInitialValues = {
    title:
      selectedTask && Object.keys(selectedTask).length > 0
        ? selectedTask?.title
        : "",
    description:
      selectedTask && Object.keys(selectedTask).length > 0
        ? selectedTask?.description
        : "",
    subtasks:
      selectedTask && Object.keys(selectedTask).length > 0
        ? selectedTask.subtasks
        : [],
    status:
      selectedTask && Object.keys(selectedTask).length > 0
        ? selectedTask.status
        : "Todo",
  };

  let isSelectedTask =
    selectedTask && Object.entries(selectedTask).length ? false : true;
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
        {(values: FormikProps<IInitialValues>) => {
          console.log("values", values);
          return (
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

                <FieldArray
                  name="subtasks"
                  render={(arrayHelpers) => (
                    <>
                      {values.values.subtasks.map((__, index) => (
                        <div className="subtask-item" key={index}>
                          <Field
                            placeholder="e.g. Make a coffee"
                            name={`subtasks[${index}].title`}
                            className="input"
                            autoComplete="off"
                          />
                          <img
                            src={cross}
                            alt="remove"
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </div>
                      ))}
                      <button
                        className="button"
                        type="button"
                        onClick={() => arrayHelpers.push({ title: "" })}
                      >
                        + Add New Subtask
                      </button>
                    </>
                  )}
                ></FieldArray>
              </div>

              <div className="field-wrapper parent">
                <label htmlFor="status">Status</label>
                <Field
                  className="input"
                  value={values.values.status}
                  name="status"
                  onClick={() => setIsOpen(true)}
                  autoComplete="off"
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
          );
        }}
      </Formik>
    </>
  );
};

export default TaskForm;
