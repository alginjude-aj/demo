// import React from "react";
// import './sidebar.css';
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Sidebar (){
//     const Navigate = useNavigate();
//     const handelLogout  = () => {
//         localStorage.removeItem("isAuth");
//         Navigate("/login");
//     }
//     return(
//         <div className="sidebar">
//             <div>
//                <i className="bi bi-bootstrap-fill my-2"></i>
//                <span className="brand-name fs-4">Sidebar</span>
//                 </div>
//             <ul>
//                 <li> <i className="bi bi-table">table</i></li>
//                 <li>
//                     <i class="bi bi-table"></i>
//                    <Link to='/list' className="sidebar-link">Student List</Link>
//                 </li>
//                 <li>
//                    <Link to='/add' className="sidebar-link">Add Student</Link>
//                 </li>
//             </ul>
//             <button className="logout-button" onClick={handelLogout}>Logout</button>
//         </div>
//     )
// }

// export default Sidebar;


import React from "react";
import './sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiBootstrapFill, BiTable } from "bootstrap-icons/bi"; // Import the specific icons you need

function Sidebar (){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        navigate("/login");
    }

    return(
        <div className="sidebar">
            <div>
               <BiBootstrapFill className="my-2" />
               <span className="brand-name fs-4">Sidebar</span>
            </div>
            <ul>
                <li> <BiTable />table</li>
                <li>
                    <BiTable />
                    <Link to='/list' className="sidebar-link">Student List</Link>
                </li>
                <li>
                   <Link to='/add' className="sidebar-link">Add Student</Link>
                </li>
            </ul>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Sidebar;
