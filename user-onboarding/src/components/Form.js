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
        <label htmlFor="name">
          Name&nbsp;
          <input
            value={values.name}
            onChange={onInputChange}
            name="name"
            type="text"
          />
        </label>

        <label htmlFor="email">
          Email&nbsp;
          <input
            value={values.email}
            onChange={onInputChange}
            name="email"
            type="email"
          />
          {errors.email.length > 0 ? <p className="error">{errors.email}</p>: null}
        </label>

        <label htmlFor="password">
          Password&nbsp;
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="password"
          />
        </label>

        <label htmlFor="terms">
          I have read the Terms and Conditions
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
        <button id="submit" >submit</button>
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
