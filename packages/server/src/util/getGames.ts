import axios from "axios";
import { parse } from "node-html-parser";

import dotenv from "dotenv";

dotenv.config();

const season = process.env.CURRENT_SEASON;

interface GameResult {
  season: string;
  week: string;
  home: {
    team: string;
    score: string;
  };
  away: {
    team: string;
    score: string;
  };
}

const getGames = async (week: string): Promise<Array<GameResult>> => {
  try {
    const { data } = await axios.get(
      `https://www.pro-football-reference.com/years/${season}/week_${week}.htm`
    );

    const games = parse(data).querySelectorAll("table.teams");

    const gameResults: Array<GameResult> = games.map((game) => {
      const home = game.querySelectorAll("tr")[2];
      const away = game.querySelectorAll("tr")[1];

      const homeTeam = home.querySelector("a").firstChild.rawText;
      const awayTeam = away.querySelector("a").firstChild.rawText;

      return {
        season,
        week,
        key: `${homeTeam} vs ${awayTeam}`,
        home: {
          team: homeTeam,
          score: home.querySelector("td.right").rawText,
        },
        away: {
          team: awayTeam,
          score: away.querySelector("td.right").rawText,
        },
      };
    });

    return gameResults;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getGames;
