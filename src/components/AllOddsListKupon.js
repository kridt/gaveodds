import React, { useEffect, useState } from "react";
import { firestoreDb } from "../firebase";

export default function AllOddsListKupon({ allOdds, id }) {
  const [color, setColor] = useState("blue");

  useEffect(() => {
    if (allOdds?.win === "true") {
      setColor("green");
    }
    if (allOdds?.win === "false") {
      setColor("red");
    }
    if (allOdds?.win === `"tbd"`) {
      setColor("blue");
    }
  }, []);

  function changeWin(e) {
    const tryk = e.target.name;

    if (tryk === "ja") {
      setColor("green");
      firestoreDb.collection("alleOdds").doc(id).update({ win: "true" });
    }
    if (tryk === "tbd") {
      setColor("blue");
      firestoreDb.collection("alleOdds").doc(id).update({ win: "tbd" });
    }
    if (tryk === "nej") {
      setColor("red");
      firestoreDb.collection("alleOdds").doc(id).update({ win: "false" });
    }
  }
  return (
    <div style={{ marginBottom: "2em", backgroundColor: color }}>
      <h1>hello world</h1>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button name="ja" onClick={(e) => changeWin(e)}>
          Ja
        </button>
        <button name="tbd" onClick={(e) => changeWin(e)}>
          ikke endnu
        </button>
        <button name="nej" onClick={(e) => changeWin(e)}>
          nej
        </button>
      </div>
    </div>
  );
}
