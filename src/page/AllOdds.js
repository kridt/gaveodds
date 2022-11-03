import React, { useEffect, useState } from "react";
import AllOddsListKupon from "../components/AllOddsListKupon";
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

  return (
    <div>
      <h1>alle odds</h1>

      <div className="oddsList">
        {allOdds?.docs?.map((data) => {
          var odds = data.data();

          return <AllOddsListKupon allOdds={odds} id={data.id} />;
        })}
      </div>
    </div>
  );
}
