import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/firebaseContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
     
        const user = userCredential.user;
        // ...
      }).then(()=>{
        navigate('/')
     
      })
      .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
