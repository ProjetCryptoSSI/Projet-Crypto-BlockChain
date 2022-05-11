import './LoginUi.css';
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import profile from "./images/b.png";
import email from "./images/user.png";
import pass from "./images/password.jpg";
function Login() {
	let navigate = useNavigate();
  return (
  <div>

  	<div className="runas">
	    <button id="b1" onClick={() => {
	          navigate("/app");
	        }}>Rus As Departement</button>
	        <button id="b1" onClick={() => {
	          navigate("/valider");
	        }}>Rus As Rectorat</button>
	        <button id="b1" onClick={() => {
	          navigate("/authentifier");
	        }}>Rus As externe</button>
	     </div>
    <div className="main">
	    
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div className = "login_form">
           <h1>Login</h1>
           <div className="first-input">
             <input type="text" placeholder="username"/>
           </div>
           <div className="second-input">
             <input type="password" placeholder="password" />
           </div>
          <div className="login-button">
          <button>Login</button>
          </div>
           
            <p className="link">
              <a href="#">Forgot password ?</a> Or <a href="#">Sign Up</a>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  </div>
  );
}

export default Login;