

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();


  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  
  const [formData, setFormData] = useState({
    submitted: false,
  });

  
  const { email, password } = user;

  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const submitHandler = (e) => {
    e.preventDefault();
    setFormData({ submitted: true });

    
    if (email.trim() && password.trim()) {
      
      axios.post('/login', user).then((data) => {
        localStorage.setItem('authorizationToken', `bearer ${data.data.token}`);
        navigate('/todo');
      });
    }
  };

  
  useEffect(() => {
    if (localStorage.getItem('authorizationToken')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <div>
      <div className="login-container">
        <Form className="login-form" onSubmit={submitHandler}>
          <h2 className="mb-4 text-center">Login</h2>

         
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={changeHandler}
              className={formData.submitted && !email.trim() ? 'is-invalid' : ''}
            />
            {formData.submitted && !email.trim() && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </FormGroup>

         
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={changeHandler}
              className={formData.submitted && !password.trim() ? 'is-invalid' : ''}
            />
            {formData.submitted && !password.trim() && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </FormGroup>

        
          <Button color="primary" type="submit" className="button">
            Login
          </Button>

         
          <div className="mt-3 text-center">
            <span className="signin">
              Sign in with <FcGoogle />
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;



