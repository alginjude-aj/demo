import React, { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import './studentList.css';
import Sidebar from "../common/sidebar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentList() {
  
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
  
    useEffect(() => {
      fetchStudents();
    }, []);
  
    const fetchStudents = () => {
      axios
        .get('http://localhost:3001/students')
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    };
  
    const handleEdit = (studentId) => {
      const studentToEdit = students.find((student) => student.id === studentId);
      navigate(`/edit/${studentId}`, { state: { student: studentToEdit } });
    };
    
  
    const handleDelete = (studentId) => {
      axios
        .delete(`http://localhost:3001/students/${studentId}`)
        .then((response) => {
          console.log('Student deleted:', response.data);
          alert('Student Data Deleted');
          // Refresh the student list after deletion
          fetchStudents();
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
          alert('error deleting student data');
        });
    };
  

    return (
      <div className="wrapper container-flex ">
        <div className="row">
          <div className="col-md-2">
          <Sidebar />
          </div>
        <div className="col-md-10 mt-20">
        <div className='studentContainer'>
          <h2>Student List</h2>
          <div className='buttonContainer'>
           {/* <Link to='/add' className='addButton'>
              Add
            </Link>  */}
            <a href="/add" type="button" className="btn btn-outline-success mb-1 float-end">Add</a>
          </div>
           <table>
            <thead>
              <tr>
                <th>Student_name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
             <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.student_name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.score}</td>
                  <td>
                    <div className="btn-group">
                    <button onClick={() => handleEdit(student.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(student.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody> 
          </table>
          </div>
          </div>
        </div>
        </div>
        
           
      );
    };
  
export default StudentList;
