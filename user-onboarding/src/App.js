import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import NewForm from './components/NewForm'

import FormSchema from "./validation/FormSchema";
import axios from "axios";
import * as Yup from "yup";
import formSchema from "./validation/FormSchema";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  terms: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //////////////// HELPERS ////////////////
  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error) 

     });
  };

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data])
      })
      .catch(err => {
       console.log(err) 
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const onInputChange = evt => {
    const { name, value } = evt.target

    Yup.reach(FormSchema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: ""
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })
  }
  

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]:checked
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms === true
    }
    postNewUser(newUser)
  }

  useEffect(() =>{
    getUsers()
  }, [])
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])




  return (
    <div className="App">
      <Form
       values={formValues}
       onInputChange={onInputChange}
       onCheckboxChange={onCheckboxChange}
       onSubmit={onSubmit}
       disabled={disabled}
       errors={formErrors}
      />


<pre>
          {JSON.stringify(users)}
        </pre>
    </div>
  );
}

export default App;
