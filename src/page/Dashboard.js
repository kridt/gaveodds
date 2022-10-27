import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>dashboard</h1>

      <button onClick={() => auth.signOut()}>Log ud</button>
    </div>
  );
}
