import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
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
