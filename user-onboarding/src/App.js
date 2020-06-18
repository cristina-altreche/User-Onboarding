import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import NewForm from "./components/NewForm";

import formSchema from "./validation/formSchema";
import axios from "axios";
import * as Yup from "yup";

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

function App() {
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  //////////////// HELPERS ////////////////
  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  // const validate = (e) => {
  //   let value =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //   Yup.reach(formSchema, e.target.name)
  //     .validate(e.target.value)
  //     .then((valid) => {
  //       setFormErrors({
  //         ...formErrors,
  //         [e.target.name]: "",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.errors);
  //       setFormErrors({
  //         ...formErrors,
  //         [e.target.name]: err.errors[0],
  //       });
  //     });
  // };

  const onInputChange = (e) => {
    const { name, value } = e.target
    Yup.reach(formSchema, name)
      .validate(value)
      .then(valid => {
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
      setFormValues({
        ...formValues,
        [name]: value
      })
  };
  //1hour in

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target

    setFormValues({
      ...formValues, [name]:checked
    })
  }

  const onSubmit = (evt) => {
    evt.preventDefault();

      // axios
      // .post("https://reqres.in/api/users", formValues)
      // .then(response => console.log(response.data))
      // .catch(err => console.log(err))
    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      terms: formValues.terms,
    }

    postNewUser(newUser)
  }

  // useEffect(() =>{
  //   getUsers()
  // }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

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

      <pre>{JSON.stringify(users)}</pre>
    </div>
  );
}

export default App;
