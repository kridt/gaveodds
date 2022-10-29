import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AddBet() {
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
      <Link to={"/adminPanel"}>Tilbage</Link>
      <h1>Tilføj bet</h1>

      <form>
        <div>
          <label htmlFor="liga">Liga:</label>
          <select>
            <option value=""></option>
            <option value="CL">Champions league</option>
          </select>
        </div>
      </form>
    </div>
  );
}
