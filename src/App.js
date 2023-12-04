import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeContext from './context/EmployeeContext'
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login'
import Employee from "./components/Employee";

function App() {
  // const [employee, setEmployee]=useState({'first_name':'', 'last_name':'', 'email':''})
  const [id, setId]=useState('')
  const [showEmployee, setShowEmployee]=useState(false)
  const [registered, setRegistered]=useState(false)
  const [action, setAction]=useState('Add')
  const [loggedin, setLoggedin]=useState(false)
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [email, setEmail]=useState('')

  function to_show_employees(){
    try{
      if (!loggedin && registered){
        return (<Login />)
      }
      else if (!loggedin && !registered){
        return (<Signup />)
      }
      if (loggedin && !showEmployee){
        return (<EmployeeList />)
      }
      if (loggedin && showEmployee){
        return (<Employee name={action}/>)
      }

    }catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <EmployeeContext.Provider value={{setEmail, email, setUsername, username, setPassword, password,
        setRegistered, registered, setLoggedin, loggedin, showEmployee, setShowEmployee, action, setAction, id, setId}}>
        {/* Main code goes here */}
        {/* I'm using context because I have to keep track of data */}

        {to_show_employees()}
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
