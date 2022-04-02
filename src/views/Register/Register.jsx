import React, { useState } from 'react';

const Register = () => {
  const [contact, setContact] = useState({ name: "", email: "", age: null })

  const validations = {
  }

  const handleBLur = (event) => {
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target
    setContact({ ...contact, [name]: type === "number" ? Number(value) : value })
  }

  const hasErrors = () => {
  }


  const handleSubmit = (e) => {

  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3 text-start">
        <label className="form-label">Name</label>
        <input
          name="name"
          type="text"
          className={`form-control ${touch.name && errors.name && "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBLur}
        />
        {/* <div className="invalid-feedback">{errors.name}</div> */}
      </div>
      <div className="mb-3 text-start">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className={`form-control ${touch.email && errors.email && "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBLur}
        />
        {/* <div className="invalid-feedback">{errors.email}</div> */}
      </div>
      <div className="mb-3 text-start">
        <label className="form-label">Age</label>
        <input
          name="age"
          type="number"
          className={`form-control ${touch.age && errors.age && "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBLur}
        />
        {/* <div className="invalid-feedback">{errors.age}</div> */}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Register;