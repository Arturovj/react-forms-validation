import React from 'react';
import { useState } from 'react';

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = () => {

  const [contact, setContact] = useState({ email: "", password: ""  })
  const [errors, setErrors] = useState({ password: false, email: false})
  const [touch, setTouch] = useState({})

  const validations = {
    email: (value) => {
      let message;
      if (!value) message = "Email is required"
      else if (!EMAIL_PATTERN.test(value))  message = "Enter a valid email format"
      return message
    },
    password: (value) => {
      let message;
      if (!value) message = "Password is required"
      return message
    }
  }

  const handleBLur = (event) => {
    const { name } = event.target
    setTouch({ ...touch, [name]: true })
  }


  const handleChange = (event) => {
    const { name, value, type } = event.target
    setContact({ ...contact, [name]: type === "number" ? Number(value) : value })
    setErrors({ ...errors, [name]: validations[name] && validations[name](value) })
  }

  const hasErrors = () => {
    return Object.keys(contact)
      .some(field => {
        let value = contact[field];
        return validations[field] && validations[field](value)
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!hasErrors()) {
      setTouch({ email: true, password: true })
        .then(contact => console.log(contact))
        .catch(error => {
          const { errors } =  error.response.data
          setErrors(errors)
        })
    }
  }



  return (
    <div>

<form onSubmit={handleSubmit} className="mt-4">
     
      <div className="mb-3 text-start">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className={`form-control ${touch.email && errors.email && "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBLur}
        />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

  
      <div className="mb-3 text-start">
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          className={`form-control ${touch.password && errors.password && "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBLur}
        />
        <div className="invalid-feedback">{errors.password}</div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

    </div>
  );
};

export default Login;