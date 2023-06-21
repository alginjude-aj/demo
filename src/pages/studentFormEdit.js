import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './studentForm.css';
import Sidebar from '../common/sidebar';

function StudentFormEdit() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [editData, setEditData] = useState({
    student_name: '',
    age: '',
    gender: '',
    score: ''
  });

  useEffect(() => {
    if (location.state && location.state.student) {
      const studentData = location.state.student;
      setEditData({
        student_name: studentData.student_name || '',
        age: studentData.age || '',
        gender: studentData.gender || '',
        score: studentData.score || ''
      });
    }
  }, [location.state]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const { student_name, age, gender, score } = editData;

    axios
      .put(`http://localhost:3001/api/students/${studentId}`, {
        student_name,
        age,
        gender,
        score
      })
      .then((response) => {
        console.log('Student updated:', response.data);
        alert('student data edited successfully');
        // Reset the edit form data
        setEditData({
          student_name: '',
          age: '',
          gender: '',
          score: ''
        });
        navigate('/list');
      })
      .catch((error) => {
        console.error('Error updating student:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
        <Sidebar />
    <div className='form-container'>
      <h2>Edit Student</h2>
      <div className="form-row">
        <label htmlFor="studentname">Name:</label>
        <input type="text" id="studentname" name="student_name"
          value={editData.student_name} onChange={handleChange} />
      
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age"
          value={editData.age} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label htmlFor="gender">Gender:</label>
        <input
          type="text" id="gender" name="gender"
          value={editData.gender} onChange={handleChange} />

        <label htmlFor="score">Score:</label>
        <input
          type="text"
          id="score"
          name="score"
          value={editData.score}
          onChange={handleChange}
        />
      </div>
      <div className="button-container">
        <button type="submit" onClick={handleUpdate}>Update</button>
      </div>
    </div>
    </div>
  );
  
}

export default StudentFormEdit;
