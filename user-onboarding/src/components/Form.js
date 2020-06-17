import React from "react";

export default function Form(props) {
  const {
    values,
    onSubmit,
    onInputChange,
    onCheckboxChange,
    disabled,
    errors,
  } = props;

  return (
    <form onSubmit={onSubmit} className="form-container">
      {/* Inputs */}
      <div className="inputs">
        <h3>New User Information</h3>
        <label>
          Name&nbsp;
          <input
            value={values.name}
            onChange={onInputChange}
            name="name"
            type="text"
          />
        </label>

        <label>
          Email&nbsp;
          <input
            value={values.email}
            onChange={onInputChange}
            name="email"
            type="text"
          />
        </label>

        <label>
          Password&nbsp;
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="text"
          />
        </label>

        <label>
          Agree with Terms of Service
          <input
            name="terms"
            type="checkbox"
            onChange={onCheckboxChange}
            checked={values.terms}
          />
        </label>
      </div>
      {/* Submit Section */}
      <div>
        <h3>Add New User</h3>
        <button disabled={disabled}>submit</button>
      </div>

      {/* Errors */}
      <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
          </div>
    </form>
  );
}
