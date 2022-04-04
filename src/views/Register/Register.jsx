import React, { useState } from 'react';
import ContactsService from '../../services/ContactsService';
import { Link } from 'react-router-dom';

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const MIN_AGE = 18;

const Register = () => {
  const [contact, setContact] = useState({ name: "", email: "", age: null })
  const [errors, setErrors] = useState({ name: false, email: false, age: false })
  const [touch, setTouch] = useState({})

  const validations = {
    name: (value) => {
      let message;
      if (!value) message = "Name is required"
      else if (value.length < 3) message = "Min length for name is 3"
      return message
    },
    email: (value) => {
      let message;
      if (!value) message = "Email is required"
      else if (!EMAIL_PATTERN.test(value))  message = "Enter a valid email format"
      return message
    },
    age: (value) => {
      let message;
      if (!value) message = "Age is required"
      else if (value < MIN_AGE)  message = "Need to be 18 at least to start coding!"
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
      setTouch({ email: true, name: true, age: true })
      ContactsService.create(contact)
        .then(contact => console.log(contact))
        .catch(error => {
          const { errors } =  error.response.data
          setErrors(errors)
        })
    }
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
        <div className="invalid-feedback">{errors.name}</div>
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
        <div className="invalid-feedback">{errors.email}</div>
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
        <div className="invalid-feedback">{errors.age}</div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

      <div>
       <Link to="/Login">Already have an account?</Link> 
      </div>
    </form>
  );
};

export default Register;