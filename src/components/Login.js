import React, { useContext } from 'react';
import './styles.css';
import EmployeeContext from '../context/EmployeeContext';
import axios from "axios";

function Login() {
    const {setUsername, setPassword, setLoggedin, username, password, setRegistered}=useContext(EmployeeContext)
  return (
    <div className="container">
      <h1>Login</h1>
        <form className='form'>
    <input
    type='text'
    placeholder='Username...'
    onChange={(e)=>setUsername(e.target.value)}
    />
    <input
    type='password'
    placeholder='Password...'
    onChange={(e)=>setPassword(e.target.value)}
    />
    <button onClick={async (event)=>{
        event.preventDefault()

        await axios.post('https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/user/login', {"username":username, "password":password})
            .then(res=> {
              console.log(res.data);
              alert(res.data.message)
              setLoggedin(true)
            }).catch(e=> {
                alert('Error while logging in')
                console.log(e)
            })
    }}>Login</button>
      
      </form>

      <div className="switch-link">
        <button onClick={(event)=>{event.preventDefault(); setRegistered(false)}}>Go to register page</button>
      </div>
    </div>
  )
}

export default Login;
