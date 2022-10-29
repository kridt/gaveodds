import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import "./Dashboard.scss";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (auth?.currentUser.uid === "INdKwGos80YWBdyJ9rVF0rOLM3W2") {
      if (auth?.currentUser.email === "chrnielsen2003@gmail.com") {
        setAdmin(true);
      }
    }
    if (auth?.currentUser.uid === "xQelb4z9KIejkFmFG5jIHfiXtKr1") {
      if (auth?.currentUser.email === "nstaalkjaer@gmail.com") {
        setAdmin(true);
      }
    }
  }, []);

  return (
    <div className="dashboard">
      {admin ? (
        <>
          <Link to={"/adminPanel"}>admin</Link>
        </>
      ) : (
        <></>
      )}

      <h1>dashboard</h1>
      <div>
        <p>Email: {auth?.currentUser.email}</p>
      </div>
      <button onClick={() => auth.signOut()}>Log ud</button>
    </div>
  );
}
