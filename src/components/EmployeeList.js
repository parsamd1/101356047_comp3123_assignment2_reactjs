import {useState, useEffect, useContext, Fragment} from 'react';
import axios from "axios";
import EmployeeContext from "../context/EmployeeContext";
import './styles.css';


function EmployeeList() {
    // introducing a random state only for re-rendering after deleting an employee
    const [count, setCount]=useState(0)
    const [employees, setEmployees]=useState([]);
    const {showEmployee, setShowEmployee, action, setAction, id, setId, setLoggedin}=useContext(EmployeeContext)


    useEffect(()=>{
        axios.get("https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/emp/employees/")
        .then(res => {
            console.log(res.data)
            console.log('use effect invoked')
            setEmployees(res.data)
        })

        .catch(()=> {

            console.log("Error fetching employees")
        })
    }, [count])
    
    function showEmployees(){
        try{

            employees.map(employee => {
                console.log(employee.first_name)
                    return(<p>{employee.first_name}</p>)
            })

        }catch (e){
            return (<p>{e.message}</p>)
        }
    }

    function callEmployee(actionPassed){
        setAction(actionPassed)
        setShowEmployee(true)
    }

    return (
        <div>
            <h1>Employee List</h1>

            <button style={{color:'white', backgroundColor:'purple', fontSize:15}} onClick={(event)=> {
                event.preventDefault()
                setId('')
                callEmployee('Add')
            }}>Add Employee</button>

                <table className="styled-table">
            <thead>
            <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Employee gender</th>
                <th>Employee Salary</th>
                <th>Actions</th>
            </tr>
            </thead>
                <tbody>
                    {employees.map(emp=>{
                        return (
                            <Fragment>
                                <tr>
                                <td>{emp.first_name}</td>
                                <td>{emp.last_name}</td>
                                <td>{emp.email}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.salary}</td>
                                <td>
                                    <button className='update-button' onClick={(event)=> {
                                        event.preventDefault()
                                        setId(emp._id)
                                        callEmployee('Update')
                                    }}>Update</button>



                                    <button className='delete-button' onClick={async (event)=> {
                                        event.preventDefault()
                                        // deleting employee happens here

                                        await axios.delete(`https://exuberant-flannel-nightgown-ant.cyclic.app/api/v1/emp/employees?eid=${emp._id}`)
                                            .then((res) => {
                                                console.log(res)
                                                alert(`Employee ${emp.first_name} ${emp.last_name} deleted!`)
                                                setCount(count+1)
                                            })
                                            .catch(e=>{
                                                console.log(e)
                                                alert('Error while deleting employee')
                                                setCount(count+1)
                                            })



                                    }}>Delete</button>




                                    <button className='view-button' onClick={(event) => {
                                        event.preventDefault()
                                        setId(emp._id)
                                        callEmployee('View')
                                    }}>View</button>
                                </td>
                                </tr>
                            </Fragment>
                        )
                    })}

                </tbody>

            </table>
            <button onClick={()=>setLoggedin(false)} className='delete-button'>Logout</button>
        </div>
    );
}

export default EmployeeList;
