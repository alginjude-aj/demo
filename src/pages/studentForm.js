
import React, { useState } from 'react';
import './studentForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/sidebar';

function StudentForm() {
  const [studentname, setStudentname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [score, setScore] = useState('');
  const navigate = useNavigate();

  const handleStudentameChange = (e) => {
    setStudentname(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/student", {
        studentname: studentname,
        age: age,
        gender: gender,
        score: score,
      })
      .then((response) => {
        console.log(response);
        // Perform any necessary actions after successful submission
        alert('Student data submitted successfully');
        setStudentname('');
        setAge('');
        setGender('');
        setScore('');
        navigate('/list');
      })
      .catch((error) => {
        console.error('Error submitting student data:', error);
        // Handle error condition
        alert('Error submitting student data');
      }).finally(()=>{console.log("Request sent")});
  };

//   const handleBack = () => {
//     navigate('/');
//   };

  return (
    <div>
        <Sidebar />
    <div className="form-container">
      <h2>Student Form</h2>
      <div className="form-row">
        <label htmlFor="studentname">Name:</label>
        <input
          type="text"
          id="studentname"
          value={studentname}
          onChange={handleStudentameChange}
        />
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" value={age} onChange={handleAgeChange} />
      </div>
      <div className="form-row">
        <label htmlFor="gender">Gender:</label>
        <input type="text" id="gender" value={gender} onChange={handleGenderChange} />
        <label htmlFor="score">Score:</label>
        <input type="text" id="score" value={score} onChange={handleScoreChange} />
      </div>
      <div className="button-container">
        {/* <button onClick={handleBack}>Back</button> */}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
  );
}

export default StudentForm;
