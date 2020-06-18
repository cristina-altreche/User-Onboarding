import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address.") 
    .required("Must include email address."),
  name: Yup.string()   
    .required("Name is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required"),
  terms: Yup.boolean()
  .oneOf([true]) 
  .required("Must Accept Terms & Conditions"),
});

export default formSchema;
