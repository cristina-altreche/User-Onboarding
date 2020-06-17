import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    name: Yup
      .string()
      .min(20, "Name must be at least 20 characters long.")
      .required("Password is Required"),
    
    password: Yup
    .string()
    .min(8, "Usermame must be at least 8 characters long.")
    .required('Password is required'),
    terms: Yup
      .boolean()
      .oneOf([true], "Must Accept Terms of Services"),
  })
  
  export default formSchema