import React from 'react'
import { Link } from 'react-router-dom'
import Validation from './SignupValidation'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function Signup() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePic: null,
    gender: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value, type, files } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(errors).every(key => errors[key] === "")) {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('profilePic', values.profilePic);
      formData.append('gender', values.gender);
      formData.append('password', values.password);

      axios.post('http://localhost:3306/signup', formData)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded-3 w-50'>
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor='firstName'><strong>First Name</strong></label>
              <input type='text' placeholder='Enter First Name' name='firstName'
                     onChange={handleInput} className='form-control rounded-0'/>
              {errors.firstName && <span className='text-danger'> {errors.firstName}</span>}
            </div>
            <div className='col'>
              <label htmlFor='lastName'><strong>Last Name</strong></label>
              <input type='text' placeholder='Enter Last Name' name='lastName'
                     onChange={handleInput} className='form-control rounded-0'/>
              {errors.lastName && <span className='text-danger'> {errors.lastName}</span>}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='Enter Email' name='email'
                   onChange={handleInput} className='form-control rounded-0'/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='phone'><strong>Phone</strong></label>
            <input type='text' placeholder='Enter Phone' name='phone'
                   onChange={handleInput} className='form-control rounded-0'/>
            {errors.phone && <span className='text-danger'> {errors.phone}</span>}
          </div>


          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor='profilePic'><strong>Profile Picture</strong></label>
              <input type='file' name='profilePic' accept='image/*'
                     onChange={handleInput} className='form-control rounded-0'/>
              {errors.profilePic && <span className='text-danger'> {errors.profilePic}</span>}
            </div>
            <div className='col'>
              <label htmlFor='gender'><strong>Gender</strong></label>
              <select name='gender' onChange={handleInput} className='form-control rounded-0'>
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && <span className='text-danger'> {errors.gender}</span>}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter Password' name='password'
                   onChange={handleInput} className='form-control rounded-0'/>
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
          <div className='mb-3 form-check'>
            <input type='checkbox' name='agreeTerms' id='agreeTerms'
                   checked={values.agreeTerms} onChange={handleInput} className='form-check-input'/>
            <label htmlFor='agreeTerms' className='form-check-label'>
              I agree to the terms and policies
            </label>
          </div>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup
