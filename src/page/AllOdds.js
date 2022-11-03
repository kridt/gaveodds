import React, { useEffect, useState } from "react";
import { firestoreDb } from "../firebase";

export default function AllOdds() {
  const [allOdds, setAllOdds] = useState([]);
  var [win, setWin] = useState("TBD");
  const [color, setColor] = useState("blue");

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
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p>{kampe.home}</p>
                  <p>{"-"}</p>
                  <p>{kampe.away}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong style={{ fontSize: ".8em", textAlign: "left" }}>
                    {kampe?.play?.map((play) => {
                      return (
                        <nav>
                          <ul>
                            <li>{play}</li>
                          </ul>
                        </nav>
                      );
                    })}
                  </strong>
                </div>
                <hr color="white" style={{ margin: "0 1em" }} />
              </div>
            );
          })}
          <p>Indskud: {e.inskud} kr</p>
          <p>Gevinst: {e.potentielGevinst} kr</p>
          <p>Odds: {(e.potentielGevinst / e.inskud).toFixed(2)} </p>
        </div>
      </>
    );
  }

  function changeWin(e) {
    const tryk = e.target.name;

    if (tryk === "ja") {
      console.log("der blev trykket ja");
      setColor("green");
    }
    if (tryk === "tbd") {
      console.log("der blev trykket stadig igang");
      setColor("blue");
    }
    if (tryk === "nej") {
      console.log("der blev trykket nej");
      setColor("red");
    }
  }

  return (
    <div>
      <h1>alle odds</h1>

      <div className="oddsList">
        <div>
          {allOdds?.docs?.map((e) => {
            const odds = e.data();
            console.log(odds.win);

            return (
              <div
                style={{
                  marginBottom: "2em",
                  backgroundColor: color,
                }}
              >
                <div>{kuponer(odds)}</div>
                <div>
                  <p>Gik den hjem?</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "1em",
                    }}
                  >
                    <button name="ja" onClick={(e) => changeWin(e)}>
                      Ja
                    </button>
                    <button name="nej" onClick={(e) => changeWin(e)}>
                      Nej
                    </button>
                    <button name="tbd" onClick={(e) => changeWin(e)}>
                      Stadig igang
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
