import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:3306/login', values)
        .then(res => {
          if (res.data === 'Success') {
            navigate('/Dashboard');
          } else {
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Admin</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Explore</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Sign-In</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input type='email' placeholder='Enter Email' name='email'
                     onChange={handleInput} className='form-control rounded-0'/>
              {errors.email && <span className='text-danger'> {errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input type='password' placeholder='Enter Password' name='password'
                     onChange={handleInput} className='form-control rounded-0'/>
              {errors.password && <span className='text-danger'> {errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
            
            <Link to="/Signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
