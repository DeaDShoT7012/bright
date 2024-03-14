import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = ({ target }) => setUserName(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        userName,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/signin`,
        data
      );
      console.log("res", response.data);
      if (response) {
        localStorage.setItem('token',response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
        if(response.data.adminType==='admin'||response.data.adminType==='office'||response.data.adminType==='employee'||response.data.adminType==='assignEmployee'){
          navigate("/home");
        }
        else{
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error);
      alert('Incorrect Password/UserName')
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData)
      if (userData.adminType === 'admin'|| userData.adminType === 'office'|| userData.adminType === 'employee'|| userData.adminType === 'assignEmployee') {
        navigate('/home');
      }
       else {
        navigate('/');
      }
    }
    else{
      navigate('/')
    }
  }, [])


  return (
   <div className='form-main'>
      <div className='login-body'>
        <div className="login-page">
    <div className="form">
    <h2 className='text-success mb-3'><b>Login to Bright Aluminium</b></h2>
      <form className="login-form"  onSubmit={handleSubmit}>
        <input type="text" placeholder="username"  onChange={handleUserName}/>
        <input type="password" placeholder="password"   onChange={handlePassword}/>
        <button type='submit'>login</button>
      </form>
      <p className='mt-3'>New User? <Link className='text-dark' to={'/signup'}>Create Account</Link></p>
    </div>
  </div> 
  </div>
   </div> 
  )
}

export default Login