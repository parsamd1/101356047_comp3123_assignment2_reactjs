import React, { useContext } from 'react';
import './styles.css';
import EmployeeContext from '../context/EmployeeContext';
import axios from 'axios'

function Signup() {
  const {email, setEmail, username, setUsername, password, setPassword, setRegistered}=useContext(EmployeeContext)
  return (
    <div className="container">
      <h1>Signup</h1>
      <div className="form">
        <input
        type='text'
        placeholder='Email...'
        onChange={event => setEmail(event.target.value)}
        />
        <input
        type='text'
        placeholder='Username...'
        onChange={e=>setUsername(e.target.value)}
        />
        <input
        type='password'
        placeholder='Password...'
        onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={async (event)=>{
            event.preventDefault()
          if (email!=='' && username!=='' && password !== ''){
            // Adding backend handling HEREEEE!!!!
            // Adding user credentials to the database
            
            await axios.post('https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/user/signup', {"username":username, "email":email, "password":password})
            .then(res=>{
                console.log(res.data);
                alert("User successfully registered");
                setRegistered(true)})
                .catch(e=> {
                    alert('Error while signing up')
                    console.log('The error is: ' + e)
                })
            

            // ****************************************
          }
        }}>Signup</button>
      </div>
      <div className="switch-link">
        <button onClick={(event)=>{event.preventDefault(); setRegistered(true)}}>Go to login page</button>
      </div>
    </div>
  );
}

export default Signup;
