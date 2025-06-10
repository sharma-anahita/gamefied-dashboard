import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
import MOCK_USER from '../utils/user.js';
import userimg from '../assets/user.png';
import passwordimg from '../assets/password.png';

export function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            localStorage.setItem('username', JSON.stringify(username));
            navigate('/dash');
            MOCK_USER.lastAction =new Date().toLocaleString();
        } else {
            alert("Invalid credentials");
        }
    };



    return(
        // <div className='login-container'>
            <div className="container">
            <div className="login-div">
                Sign-In
                <div>
                    <label htmlFor="login-username"><img src={userimg} alt=""  className='icon' /> </label>
                    <input onChange={(e)=>setUsername(e.target.value)} type="text" id="login-username" placeholder="Enter your username"/>
                </div>
                <div>
                    <label htmlFor="login-password"><img src={passwordimg} alt="" className='icon' /> </label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="login-password" placeholder="Enter your password"/>
                </div>
                <button className='login-button' onClick={handleLogin}>login</button>
            </div>
            </div>
        // </div>
    );
}

export default Login;