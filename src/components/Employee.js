import React, {useContext, useEffect, useState} from 'react';
import EmployeeContext from "../context/EmployeeContext";
import axios from "axios";
import './styles.css';


function Employee(props) {
    // const [fname, setFname]=useState('')
    // const [lname, setLname]=useState('')
    // const [e_mail, setE_mail]=useState('')

    const {setShowEmployee, id}=useContext(EmployeeContext)
    const [employee, setEmployee]=useState({'first_name':'', 'last_name':'', 'email':''})
    let urlEmployee=`https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/emp/employees/${id}`

    useEffect(() => {
             axios.get(urlEmployee)
                .then((res)=>{
                    if (res.status>=200 && res.status<300){
                        setEmployee(res.data)
                        console.log(res)
                    }
                    else {
                        setEmployee({'first_name':'', 'last_name':'', 'email':''})
                        console.log(res)
                    }
                })
                .catch((e)=> {
                    setEmployee({'first_name':'', 'last_name':'', 'email':''})
                    console.log(e)
                })
    }, []);

    function buttonAndAction(){
        if(props.name==='Update'){
            return(
                <button onClick={ async (event)=>
                {
                    event.preventDefault()
                    // This is where data handling happens for Axios -> Put -> Employee
                    await axios.put(urlEmployee, employee)
                        .then((res)=>{
                            console.log(res)
                            alert('Employee updated successfully')
                            setShowEmployee(false)
                        })
                        .catch((e)=>{
                            console.log(e)
                            alert('Error while updating employee')
                        })
                }
                }>Update Employee</button>
            )
        }
        else if (props.name==='Add'){
            return (
                <button onClick={ async (event)=>
                {
                    event.preventDefault()
                    // This is where code goes for Axios -> Post -> Employee
                    await axios.post('https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/emp/employees', employee)
                        .then((res)=>{
                            console.log(res)
                            console.log(employee)
                            alert('Employee added successfully')
                            setShowEmployee(false)
                        })
                        .catch((e)=>{
                            console.log(e)
                            console.log(employee)
                            alert('Error while adding employee')
                        })
                }
                }>Add Employee</button>
            )
        }
    }
    if (props.name==='Update' || props.name==='Add'){
    return (
        <div className='container'>
            <h1>{props.name} Employee</h1>
            {/* this is where employee details are printed */}
            <form className='form'>
                <label>First Name: </label>
                <input
                type='text'
                defaultValue={employee.first_name}
                onChange={(event)=>setEmployee({
                    ...employee,
                    'first_name':event.target.value
                })}
                />
                <label>Last Name:</label>
                <input
                type='text'
                defaultValue={employee.last_name}
                onChange={(event)=>setEmployee({
                    ...employee,
                    'last_name':event.target.value
                })}
                />
                <label>Email:</label>
                <input
                type='text'
                defaultValue={employee.email}
                onChange={(event)=>setEmployee({
                    ...employee,
                    'email':event.target.value
                })}
                />
                <label>Gender (Male/Female/Other):</label>
                <input
                    type='text'
                    defaultValue={employee.gender}
                    onChange={(event)=>setEmployee({
                        ...employee,
                        'gender':event.target.value
                    })}
                />
                <label>Salary:</label>
                <input
                    type='number'
                    defaultValue={employee.email}
                    onChange={(event)=>setEmployee({
                        ...employee,
                        'salary':event.target.value
                    })}
                />
                {buttonAndAction()}
            </form>

            <div className='switch-link'>
            <button onClick={()=>setShowEmployee(false)}>Go Back</button>
            </div>
        </div>
    );}
    else {
        return (
            <div className='container'>
                <h1>{props.name} Employee (Read-Only fields)</h1>
                {/* this is where employee details are printed */}
                <form className='form'>
                    <label>First Name: </label>
                    <input
                        type='text'
                        value={employee.first_name}
                    />
                    <label>Last Name:</label>
                    <input
                        type='text'
                        value={employee.last_name}
                    />
                    <label>Email:</label>
                    <input
                        type='text'
                        value={employee.email}
                    />
                    <label>Gender: </label>
                    <input
                        type='text'
                        value={employee.gender}
                    />
                    <label>Salary: </label>
                    <input
                        type='number'
                        value={employee.salary}
                    />
                    {buttonAndAction()}
                </form>

                <div className='switch-link'>
                    <button onClick={()=>setShowEmployee(false)}>Go Back</button>
                </div>
            </div>
        )
    }
}

export default Employee;