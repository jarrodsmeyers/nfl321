import React, { useState, useContext } from "react";

import firebase from "../firebase";
import { getScoresByWeek, loadSchedule } from "../api";
import { AuthContext } from "../contexts";

interface Score {
  home: {
    team: string;
    score: string;
  };
  away: {
    team: string;
    score: string;
  };
}

const Home = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [week, setWeek] = useState("0");

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await getScoresByWeek(week);

      setScores(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Log Out
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />
        <button type="submit">Get Scores</button>
      </form>

      <main>
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              <ul>
                <li>
                  {score.home.team} - {score.home.score}
                </li>
                <li>
                  {score.away.team} - {score.away.score}
                </li>
              </ul>
              <hr />
            </li>
          ))}
        </ul>

        {user?.uid === "KC8XuHXRmNfNjT9ZGBPuZ0uEl3r1" && (
          <>
            <h1>ADMIN</h1>
            <button type="button" onClick={() => loadSchedule()}>
              Load Schedule
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
