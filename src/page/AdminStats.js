import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestoreDb } from "../firebase";

export default function AdminStats() {
  const [allOdds, setAllOdds] = useState([]);
  var test = [];
  const [stats, setStats] = useState({
    antalWins: 0,
    winRate: 0,
    antalTabte: 0,
    totalGevinst: 0,
    lagtIAlt: 0,
    højesteWinIkr: 0,
    højesteOddsVundet: 0,
  });

  useEffect(() => {
    firestoreDb
      .collection("alleOdds")
      .get()
      .then((data) => setAllOdds(data.docs));

    allOdds?.forEach((e) => {
      test.push(e.data());
    });
    renderData(test);
  }, []);

  function renderData(data) {
    console.log(data);
    const wins = data.filter((x) => x.win === "true").length;
    const losses = data.filter((x) => x.win === "false").length;
    const moneySpend = data.reduce((ps, a) => parseFloat(ps + a.inskud), 0);
    console.log(moneySpend);

    setStats({
      antalWins: wins,
      antal: data.length,
      winRate: parseFloat(((wins / data.length) * 100).toFixed(2)),
      antalTabte: losses,
      totalGevinst: 0,
      lagtIAlt: moneySpend,
      højesteWinIkr: 0,
      højesteOddsVundet: 0,
    });
  }

  return (
    <div>
      <Link to="/adminPanel">Tilbage</Link>
      <h1>stats</h1>
    </div>
  );
}
