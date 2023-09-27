import React, { useEffect, useContext } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import "./App.css";
import { AuthContext, FirebaseContext } from "./store/firebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./store/postContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();

    const LoginGuard = ({ element }) => {
      if (user) {
        // If the user is already logged in, redirect them to the home page
        return <Navigate to="/" />;
      }
      return element;
    };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginGuard element={<Login />} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
