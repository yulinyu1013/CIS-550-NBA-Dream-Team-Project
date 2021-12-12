const mysql = require('mysql2/promise');
require('dotenv').config();

// "rds_host": "mysql.cbxetj19oidu.us-east-2.rds.amazonaws.com",
//     "rds_port": "3306",
//     "rds_user": "admin",
//     "rds_password" : "Cis550Fall!",
//     "rds_db": "NBA"

const connect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
    console.log(`Connected to database: ${connection.connection.config.database}`);
    return connection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// Home Page
const gameOfTheSeason = async(db) => {
  const query = `
                SELECT team_abbreviation_home, team_name_home, game_date, pts_home, reb_home, ast_home, 
                fgm_home, ftm_home, fta_home, ft_pct_home, pf_home, 
                team_abbreviation_away, team_name_away, pts_away, reb_away, ast_away, 
                fgm_away, ftm_away, fta_away, ft_pct_away, pf_away, game_date
                FROM Game 
                WHERE team_abbreviation_home = 'LAL' AND 
                      team_abbreviation_away = 'LAC' AND 
                      game_date = '2020-12-22';
                `;
  try {
    const row = await db.execute(query);
    return row[0][0];
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}

const allTimeTop10 = async(db) => {
  const query = `
                (SELECT full_name AS player, 'pts' AS category, ROUND(pts,3) AS value
                FROM Player 
                ORDER BY pts DESC 
                LIMIT 10)
                UNION
                (SELECT full_name AS player, 'ast' AS category, ROUND(ast,3) AS value
                FROM Player 
                ORDER BY ast DESC 
                LIMIT 10)
                UNION
                (SELECT full_name AS player, 'reb' AS category, ROUND(reb,3) AS value 
                FROM Player 
                ORDER BY reb DESC 
                LIMIT 10)
              `;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (err) {
      console.log(`Error: ${err.message}`);
      throw new Error('Error executing the query');
    }
}

// Game Page
 const funFact = async(db) => {
  const query = `
                WITH HOME_TEAM(team_name, year_founded) AS (
                  SELECT full_name, year_founded FROM Team WHERE full_name = 'Los Angeles Lakers'
              ),
              AWAY_TEAM(team_name, year_founded) AS (
                  SELECT full_name, year_founded FROM Team WHERE full_name = 'Los Angeles Clippers'
              ),
              HOME_TEAM_MVP(team_name, player_name, salary) AS (
                  SELECT nameTeam, namePlayerBREF, MAX(amountSalary)
                  FROM Player_Bios
                  WHERE nameTable = 'Salaries' AND
                        nameTeam = 'Los Angeles Lakers' AND
                        amountSalary IS NOT NULL
                  GROUP BY nameTeam, namePlayerBREF
                  ORDER BY MAX(amountSalary) DESC
                  LIMIT 1
              ),
              AWAY_TEAM_MVP(team_name, player_name, salary) AS (
                  SELECT nameTeam, namePlayerBREF, MAX(amountSalary)
                  FROM Player_Bios
                  WHERE nameTable = 'Salaries' AND
                        nameTeam = 'Los Angeles Clippers' AND
                        amountSalary IS NOT NULL
                  GROUP BY nameTeam, namePlayerBREF
                  ORDER BY MAX(amountSalary) DESC
                  LIMIT 1
              )
              SELECT 'Los Angeles Lakers' AS home_team, 'Los Angeles Clippers' AS away_team,
                    HT.year_founded AS home_team_founded, AT.year_founded AS away_team_founded,
                    SUM(LAL_win) AS home_win, COUNT(LAL_win) - SUM(LAL_win) AS away_win, COUNT(LAL_win) AS total_match,
                    HTM.player_name AS home_mvp, HTM.salary AS home_mvp_salary,
                    ATM.player_name AS away_mvp, ATM.salary AS away_mvp_salary
              FROM (SELECT team_name_home, team_name_away,
                          IF(team_name_home = 'Los Angeles Lakers' AND wl_home = 'W' OR
                              team_name_away = 'Los Angeles Lakers' AND wl_away = 'W', 1, 0) AS LAL_win
                    FROM Game
                    WHERE (team_name_home = 'Los Angeles Lakers' AND team_name_away = 'Los Angeles Clippers') OR
                          (team_name_home = 'Los Angeles Clippers' AND team_name_away = 'Los Angeles Lakers')) AS W
              LEFT JOIN HOME_TEAM HT ON W.team_name_home = HT.team_name
              LEFT JOIN AWAY_TEAM AT ON W.team_name_away = AT.team_name
              LEFT JOIN HOME_TEAM_MVP HTM ON W.team_name_home = HTM.team_name
              LEFT JOIN AWAY_TEAM_MVP ATM ON W.team_name_away = ATM.team_name;
              `;
    try {
      const row = await db.execute(query);
      return row[0][0];
    } catch (err) {
      console.log(`Error: ${err.message}`);
      throw new Error('Error executing the query');
    }
 }


 const gameSearch = async(db, params) =>{
  console.log('connect to db...');
   const query = `
   SELECT game_id, team_abbreviation_home, team_name_home, game_date, season, 
   pts_home, reb_home, ast_home, fgm_home, ftm_home, fta_home, ft_pct_home, pf_home, 
   team_abbreviation_away, team_name_away, pts_away, reb_away, ast_away, 
   fgm_away, ftm_away, fta_away, ft_pct_away, pf_away
    FROM Game
    WHERE (team_abbreviation_home = '${params.home}' OR team_name_home LIKE '%${params.home}%') AND
      (team_abbreviation_away = '${params.away}' OR team_name_away LIKE '%${params.away}%') AND
      game_date LIKE '%${params.date}%' AND
      pts_home >= ${params.pts_home_low} AND pts_home <= ${params.pts_home_high} AND
      pts_away >= ${params.pts_away_low} AND pts_away <= ${params.pts_away_high} AND
      reb_home >= ${params.reb_home_low} AND reb_home <= ${params.reb_home_high} AND
      reb_away >= ${params.reb_away_low} AND reb_away <= ${params.reb_away_high} AND
      ast_home >= ${params.ast_home_low} AND ast_home <= ${params.ast_home_high} AND
      ast_away >= ${params.ast_away_low} AND ast_away <= ${params.ast_away_high}
   `;
   try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
 }

const gameTeamStats = async(db, name) =>{
  const query = `
                SELECT 'Home' as game, COUNT(*) count,
                COUNT(CASE WHEN wl_home = 'W' THEN 1 END ) win,
                COUNT(CASE WHEN wl_home = 'L' THEN 1 END ) lost,
                AVG(IF(wl_home = 'W', plus_minus_home, 0)) avg_win_pts,
                AVG(IF(wl_home = 'L', plus_minus_home, 0)) avg_lost_pts
                FROM Game
                WHERE team_abbreviation_home = '${name}'
                UNION
                SELECT 'Away' as game, COUNT(*) count,
                COUNT(CASE WHEN wl_away = 'W' THEN 1 END ) win,
                COUNT(CASE WHEN wl_away = 'L' THEN 1 END ) lost,
                AVG(IF(wl_away = 'W', plus_minus_away, 0)) avg_win_pts,
                AVG(IF(wl_away = 'L', plus_minus_away, 0)) avg_lost_pts
                FROM Game
                WHERE team_abbreviation_away = '${name}';
                `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}
// Player Page

// Team Page


module.exports = {
  connect,
  gameOfTheSeason,
  allTimeTop10,
  funFact,
  gameSearch,
  gameTeamStats

};