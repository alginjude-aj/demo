import React from 'react';
import SignupForm from './forms/Signup';
import LoginForm from './forms/LoginForm';
import Sidebar from './common/sidebar';
import StudentList from './pages/studentList';
import StudentForm from './pages/studentForm';
import StudentFormEdit from './pages/studentFormEdit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from "./AuthContext";
import PrivateRoute from './PrivateRoute';
import Header from './common/Header';


function App() {

  return (
    <Router>
      <Header/>
      <Routes>
         <Route path='/login' element={<LoginForm />} />
         <Route path='/signup' element={<SignupForm />} /> 

         <Route element={<PrivateRoute />}>
          <Route path='/' element={<Sidebar />} />
          <Route path="list" element={<StudentList />} />
          <Route path='/add' element={<StudentForm />} />
          <Route path='/edit/:studentid' element={<StudentFormEdit />} /> 
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;
