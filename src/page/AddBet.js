import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AddBet() {
  const navigate = useNavigate();
  const [kupon, setKupon] = useState([]);
  const [indskud, setIndskud] = useState(1);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("/ligaer.json").then((data) => setLeagues(data.data));
  }, []);

  function totalOddsCalc(e) {
    var totalOdds = 1;
    var oddsArray = [];

    kupon.map((e) => {
      return oddsArray.push(e.odds);
    });

    oddsArray.forEach((e) => {
      return (totalOdds = totalOdds * e);
    });
    console.log(totalOdds.toFixed(2));
    return totalOdds.toFixed(2);
  }

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

  function addMatchBet(e) {
    e.preventDefault();
    const datoForKamp = e.target.date.value;
    const finalOdds = e.target.finalOdds.value.replace(",", ".");
    var matchOdds = {
      odds: parseFloat(finalOdds),
      dato: dateConverter(datoForKamp),
      home: e.target.home.value,
      away: e.target.away.value,
      play: e.target.odds.value,
      league: e.target.league.value,
    };

    setKupon((oldarray) => [...oldarray, matchOdds]);
  }

  function dateConverter(e) {
    const t = e.split("-");
    return `${t[2]}-${t[1]}/${t[0]}`;
  }

  function playKupon(e) {
    e.preventDefault();
  }

  function teamsSet(league) {
    setTeams(leagues?.find((leaguer) => leaguer.name === league).teams);
    console.log(teams);
  }

  return (
    <div>
      <Link to={"/adminPanel"}>Tilbage</Link>
      <h1>Tilføj bet</h1>

      <form onSubmit={(e) => addMatchBet(e)}>
        <div>
          <label htmlFor="date">Vælg dato for kamp</label>
          <input required type="date" name="date" />
        </div>
        <div>
          <label htmlFor="liga">Liga:</label>
          <input
            required
            list="leagueList"
            name="league"
            onBlur={(e) => teamsSet(e.target.value)}
          />

          <datalist id="leagueList">
            {leagues?.map((data) => {
              return <option value={data.name}></option>;
            })}

            {/* <option value="Premier League" id="1"></option>
            <option value="Bundesliga" id="2"></option>
            <option value="La Liga" id="3"></option>
            <option value="Ligue 1" id="4"></option>
            <option value="Champions league" id="5"></option>
            <option value="conferense league" id="6"></option>
            <option value="europa league" id="7"></option> */}
          </datalist>

          <div>
            <label htmlFor="home">Hjemmehold:</label>
            <input required list="homeTeam" name="home" />

            <datalist id="homeTeam">
              {teams?.map((e) => {
                console.log(e);
                return <option key={e.name} value={e.name}></option>;
              })}
            </datalist>
          </div>
          <div>
            <label htmlFor="away">Udehold:</label>
            <input required list="awayTeam" name="away" />

            <datalist id="awayTeam">
              {teams?.map((e) => {
                console.log(e);
                return <option key={e.name} value={e.name}></option>;
              })}
            </datalist>
          </div>

          <div>
            <label htmlFor="odds">Hvad skal vi oddse?</label>
            <textarea
              required
              name="odds"
              id="odss"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div>
            <label htmlFor="value">Hvad er oddsen på den kamp?</label>
            <input required name="finalOdds" type={"tel"} />
          </div>
        </div>

        <input type="submit" value="tilføj til kupon" />
      </form>

      <form onSubmit={(e) => playKupon(e)}>
        <p>Kupon</p>
        <div
          style={{
            backgroundColor: "grey",
            width: "75%",
            minHeight: "100px",
            margin: "0 auto",
          }}
        >
          <p>Antal kampe: {kupon.length}</p>
          <div>
            <label htmlFor="indskud">Indskud</label>
            <input
              type="number"
              name="indskud"
              onBlur={(e) => setIndskud(e.target.value)}
            />
          </div>
          {kupon?.map((e) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flex: "10",
                    }}
                  >
                    <p key={e.home}>{e.home}</p>
                    <p> - </p>
                    <p key={e.away}>{e.away}</p>
                  </div>
                  <div style={{ flex: "9" }}>
                    <p>{e.odds}</p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.9em",
                    position: "relative",
                    right: "90px",
                    bottom: "20px",
                  }}
                >
                  {e.play}
                </span>
              </>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "4em",
            }}
          >
            <p>Total odds:</p>
            <p>{totalOddsCalc()}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "4em",
            }}
          >
            <p>Potentiel gevinst:</p>
            <p>{totalOddsCalc() * indskud} kr</p>
          </div>
        </div>

        <input type="submit" value="Spil kupon" />
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
