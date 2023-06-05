import { useContext } from "react";
import cross from "../../assets/icon-cross.svg";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CopyContext } from "../../App";
import { validationSchemaBoard } from "../../lib/form-validation";

type Props = {
  setIsModalOpen: (e: string | boolean) => void;
};

interface BoardFormValues {
  name: string;
  columns: Array<{ name: string }>;
}

const BoardForm = ({ setIsModalOpen }: Props) => {
  const { setCopy, selectedBoard, isModalOpen } = useContext(CopyContext);

  const isAddBoard = isModalOpen === "add_new_board" ? true : false;

  const initialValues: BoardFormValues = {
    name: !isAddBoard ? selectedBoard.name : "",
    columns: !isAddBoard ? selectedBoard.columns : [{ name: "", columns: [] }],
  };
  return (
    <>
      <h1>{isAddBoard ? "Add New Board" : "Edit Board"}</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaBoard}
        onSubmit={(values: any) => {
          if (isAddBoard) {
            values.columns.map((col: any) => (col.tasks = []));
            setCopy((prevState: any) => [...prevState, values]);
          } else {
            console.log(values.columns.map((col: any) => col.name));
          }
          setIsModalOpen(false);
        }}
      >
        {(values) => {
          console.log("values", values);

          return (
            <Form className="form">
              <div className="field-wrapper">
                <label htmlFor="name">Board Name</label>
                <Field
                  name="name"
                  className="input"
                  style={
                    values.errors.name && values.touched.name === true
                      ? { outline: "1px solid red" }
                      : null
                  }
                />
                <ErrorMessage
                  name="name"
                  className="error-message"
                  component={"div"}
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="name">Board Columns</label>

                <FieldArray
                  name="columns"
                  render={(arrayHelpers) => {
                    return (
                      <>
                        {values.values.columns.map((__: any, index: number) => (
                          <div key={index} className="subtask-item">
                            <Field
                              placeholder="e.g. Todo"
                              name={`columns[${index}].name`}
                              className="input"
                            />
                            <img
                              src={cross}
                              alt="cross"
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </div>
                        ))}
                        <button
                          className="button"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: "",
                            })
                          }
                        >
                          + Add New Column
                        </button>
                      </>
                    );
                  }}
                />
              </div>

              <button type="submit" className="button submit">
                {isAddBoard ? "Create New Board" : "Save Changes"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BoardForm;
