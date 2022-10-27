import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignOutButton() {
  const { logOut } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logOut();
      window.location.reload();
      /* history("/login"); */
    } catch {
      setError("Noget gik galt, prøv igen senere");
      alert(error);
    }
  }

  return <button onClick={handleLogout}>Log ud</button>;
}
