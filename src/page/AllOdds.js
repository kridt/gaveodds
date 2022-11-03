import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllOddsListKupon from "../components/AllOddsListKupon";
import { firestoreDb } from "../firebase";

export default function AllOdds() {
  const [allOdds, setAllOdds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firestoreDb
      .collection("alleOdds")
      .get()
      .then((e) => {
        setAllOdds(e);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <Link to={"/adminPanel"}>Tilbage</Link>

          <h1>loading...</h1>
          <i class="fa fa-spinner" aria-hidden="true"></i>
        </>
      ) : (
        <>
          <Link to={"/adminPanel"}>Tilbage</Link>
          <h1>alle odds</h1>

          <div className="oddsList">
            {allOdds?.docs?.map((data) => {
              var odds = data.data();

              return (
                <AllOddsListKupon key={data.id} allOdds={odds} id={data.id} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
