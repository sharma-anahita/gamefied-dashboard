import './styles/Login.css'

import { React, useState } from 'react';
export function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

   const handleLogin = () => {
        console.log("Username:", username);
        console.log("Password:", password);
        // You can add form validation or API calls here
    };


    return(
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
    );
}

export default Login;