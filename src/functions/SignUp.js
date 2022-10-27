import React, { useRef, useState } from "react";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestoreDb } from "../firebase";

export default function SignUp() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = {
      name: e.target.name.value,
      telefon: parseInt(e.target.tele.value),
      birthday: e.target.birthday.value,
      email: e.target.email.value,
    };
    console.log(formData);

    auth
      .createUserWithEmailAndPassword(formData.email, e.target.password.value)
      .then((e) => {
        console.log("user created", e);
        firestoreDb.collection("users").doc(e.user.uid).set(formData);
        navigate("/");
      });
  }

  return (
    <div className="signUpDoc">
      <h2>Opret profil</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type={"text"}
            name="name"
            placeholder="Dit fulde navn"
            required
          />
        </div>
        <div>
          <input
            type={"tel"}
            name="tele"
            placeholder="Dit telefon nummer"
            required
          />
        </div>
        <div>
          <input
            type={"date"}
            name="birthday"
            placeholder="Din fødseldag"
            required
          />
        </div>
        <div>
          <input type={"email"} name="email" placeholder="Din email" required />
        </div>
        <div>
          <input
            name="password"
            type={"password"}
            placeholder="Vælg en adgangskode"
            required
          />
        </div>

        <div>
          <input
            name="passwordConfirm"
            placeholder="Gentag adgangskode"
            required
            type={"password"}
          />
        </div>

        <div>
          <button type="submit">Opret</button>
        </div>
      </form>
      <p>
        Har du allerede en profil? <Link to="/login">Log ind her</Link>
      </p>
    </div>
  );
}
