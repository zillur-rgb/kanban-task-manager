import * as Yup from "yup";

export const validationSchemaTask = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(100, "Too long!")
    .required("Can't be empty"),
  description: Yup.string()
    .min(3, "Minumum 3 characters")
    .max(250, "Too long!")
    .required("Can't be empty"),
  status: Yup.string().required("Cant be empty"),
});

export const validationSchemaBoard = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 charcters!")
    .max(100, "Too long!")
    .required("Can not be empty"),
});
