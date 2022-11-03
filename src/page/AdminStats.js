import React from "react";
import { Link } from "react-router-dom";

export default function AdminStats() {
  var stats = {
    antalWins: 0,
    winRate: 0,
    antalTabte: 0,
    totalGevinst: 0,
    lagtIAlt: 0,
    højesteWinIkr: 0,
    højesteOddsVundet: 0,
  };

  console.log(stats);
  return (
    <div>
      <Link to="/adminPanel">Tilbage</Link>
      <h1>stats</h1>
    </div>
  );
}
