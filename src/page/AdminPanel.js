import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.currentUser.email === "nstaalkjaer@gmail.com") {
      return;
    } else {
      if (auth?.currentUser.uid === "xQelb4z9KIejkFmFG5jIHfiXtKr1") {
        return;
      } else {
        if (auth?.currentUser.email === "chrnielsen2003@gmail.com") {
          return;
        } else {
          if (auth?.currentUser.uid === "INdKwGos80YWBdyJ9rVF0rOLM3W2") {
            return;
          } else {
            navigate("/");
          }
        }
      }
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin panel</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link style={{ marginBottom: "3em" }} to={"/addBet"}>
          Tilføj en odds
        </Link>
        <Link style={{ marginBottom: "3em" }} to={"/allodds"}>
          Se alle odds
        </Link>
        <Link style={{ marginBottom: "3em" }} to={"/stats"}>
          Vores stats
        </Link>
      </div>
    </div>
  );
}
