import React, { useEffect, useState } from "react";
import { stringify } from "uuid";
import { firestoreDb } from "../firebase";

export default function AllOdds() {
  const [allOdds, setAllOdds] = useState([]);
  var [win, setWin] = useState("blue");
  useEffect(() => {
    firestoreDb
      .collection("alleOdds")
      .get()
      .then((e) => {
        setAllOdds(e);
      });
  }, []);

  function kuponer(e) {
    return (
      <>
        <div className="kampe">
          {e?.kampe.map((kampe) => {
            return (
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex" }}>
                  <p>{kampe.home}</p>
                  <p>{"-"}</p>
                  <p>{kampe.away}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{kampe.play}</strong>
                </div>
              </div>
            );
          })}
          <p>Gevinst: {e.potentielGevinst} kr</p>
        </div>
      </>
    );
  }

  function changeWin(e2, id) {
    var result = "TBD";

    if (e2 === "TBD") {
      result = "TDB";
    }
    if (e2 === "true") {
      result = true;
    }
    if (e2 === "false") {
      result = false;
    }

    console.log(result);
    firestoreDb.collection("alleOdds").doc(id).update({
      win: result,
    });

    if (e2 === "TBD") {
      setWin("blue");
    }
    if (e2 === "true") {
      setWin("green");
    }
    if (e2 === "false") {
      setWin("red");
    }
  }

  return (
    <div>
      <h1>alle odds</h1>

      <div className="oddsList">
        <div>
          {allOdds?.docs?.map((e) => {
            const odds = e.data();

            if (odds.win === "TBD") {
              win = "blue";
            }
            if (odds.win === true) {
              win = "green";
            }
            if (odds.win === false) {
              win = "red";
            }

            return (
              <div
                style={{
                  backgroundColor: win,
                  marginBottom: "2em",
                }}
              >
                <div>{kuponer(odds)}</div>
                <div>
                  <p>Gik den hjem?</p>
                  <select
                    onChange={(e2) => changeWin(e2.target.value, e.id)}
                    name="win"
                    id="win"
                  >
                    <option value={odds.win}>{JSON.stringify(odds.win)}</option>
                    <option value={true}>Win</option>
                    <option value={false}>Loose</option>
                    <option value={"TBD"}>TBD</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
