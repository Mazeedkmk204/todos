import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email:'',
        password:''
    })
    const changeHandler = (e) =>{
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post('/login', user).then(data => {
            localStorage.setItem('authorizationToken', `bearer ${data.data.token}`)
            if (localStorage.getItem('authorizationToken')) {
            navigate("/todo");
              }
        })
    }

    useEffect(()=>{
        if(localStorage.getItem('authorizationToken')) return navigate("/todo")
    },[])

  return (
    <div>
        <form onSubmit={submitHandler}>
            <input type='email' name='email' placeholder='abc@xyz.com' onChange={changeHandler} />
            <br/>
            <input type='password' name='password' placeholder='1234567' onChange={changeHandler} />
            <br/>
            <button type='submit'>Login</button>
        </form>
   
    </div>
  )
}

export default Login
