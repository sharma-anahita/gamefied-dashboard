import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
import MOCK_USER from '../utils/user.js';


export function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            localStorage.setItem('username', JSON.stringify(username));
            navigate('/dash');
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
                    <label htmlFor="login-username">Username : </label>
                    <input onChange={(e)=>setUsername(e.target.value)} type="text" id="login-username" placeholder="Enter your username"/>
                </div>
                <div>
                    <label htmlFor="login-password">Password : </label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="login-password" placeholder="Enter your password"/>
                </div>
                <button className='login-button' onClick={handleLogin}>login</button>
            </div>
            </div>
        // </div>
    );
}

export default Login;