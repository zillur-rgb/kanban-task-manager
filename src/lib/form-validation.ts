import * as Yup from "yup";

export const validationSchemaTask = Yup.object().shape({
  title: Yup.string()
    .min(10, "Minimum 10 characters")
    .max(100, "Too long!")
    .required("Can't be empty"),
  description: Yup.string()
    .min(10, "Minumum 10 characters")
    .max(250, "Too long!")
    .required("Can't be empty"),
  status: Yup.string().required("Cant be empty"),
});

export const validationSchemaBoard = Yup.object().shape({
  name: Yup.string()
    .min(10, "Minimum 10 charcters!")
    .max(100, "Too long!")
    .required("Can not be empty"),
});
