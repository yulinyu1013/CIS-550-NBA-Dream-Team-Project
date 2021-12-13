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
  // console.log('connect to db...');
   const query = `
   SELECT game_id, team_abbreviation_home, team_name_home, game_date, season, 
   pts_home, reb_home, ast_home, fgm_home, ftm_home, fta_home, ft_pct_home, pf_home, 
   team_abbreviation_away, team_name_away, pts_away, reb_away, ast_away, 
   fgm_away, ftm_away, fta_away, ft_pct_away, pf_away
    FROM Game
    WHERE (team_abbreviation_home = '${params.home}' OR team_name_home LIKE '%${params.home}%') AND
      (team_abbreviation_away = '${params.away}' OR team_name_away LIKE '%${params.away}%') AND
      game_date >= '${params.min_date}' AND game_date <= '${params.max_date}' AND
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
const playerSearch = async(db, params) => {
  const query = `
        SELECT P.id AS player_id, full_name, player_slug, birth_date, school, country, last_affiliation, height, weight, season_exp, jersey, position, roster_status, games_played_current_season_flag, team_id, player_code, from_year, to_year, draft_year, draft_round, draft_number, 
        ROUND(pts,3) AS pts, ROUND(ast,3) AS ast, ROUND(reb,3) AS reb, all_star_appearances, salary
        FROM Player P
            JOIN (SELECT id, MAX(amountSalary) AS salary
                  FROM Player_Bios
                  WHERE nameTable = 'Salaries'
                  GROUP BY id) S ON P.id = S.id
        WHERE full_name LIKE '${params.first_name}%' AND full_name LIKE '%${params.last_name}' AND
              player_slug LIKE '%${params.player_slug}%' AND
              salary >= ${params.min_salary}  AND
              pts >= ${params.pts_low} AND pts <= ${params.pts_high} AND
              reb >= ${params.reb_low} AND reb <= ${params.reb_high} AND
              ast >= ${params.ast_low} AND ast <= ${params.ast_high} AND
              position LIKE '%${params.position}%';
                `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}

const playerNetwork = async(db, name) =>{
  const query = `
                  WITH FIRST_TEAM(team_id, team_name) AS
                  (SELECT P.team_id, T.full_name AS team_name
                  FROM Player P JOIN Team T ON P.team_id = T.id
                  WHERE P.full_name = '${name}'),
                FIRST_TEAMMATE(full_name, team_id, connection) AS
                  (SELECT P.full_name, P.team_id, 1
                  FROM Player P JOIN FIRST_TEAM FT ON P.team_id = FT.team_id
                  WHERE P.full_name != '${name}'),
                SECOND_TEAM(team_id, team_name) AS
                  (SELECT P.team_id, T.full_name AS team_name
                  FROM Player P JOIN Team T ON P.team_id = T.id
                  WHERE P.full_name IN (SELECT full_name FROM FIRST_TEAMMATE)),
                SECOND_TEAMMATE(full_name, team_id, connection) AS
                  (SELECT P.full_name, P.team_id, 2
                  FROM Player P JOIN SECOND_TEAM ST ON P.team_id = ST.team_id
                  WHERE P.full_name != '${name}' AND
                        P.full_name NOT IN (SELECT full_name FROM FIRST_TEAMMATE)),
                THIRD_TEAM(team_id, team_name) AS
                  (SELECT P.team_id, T.full_name AS team_name
                  FROM Player P JOIN Team T ON P.team_id = T.id
                  WHERE P.full_name IN (SELECT full_name FROM SECOND_TEAMMATE)),
                THIRD_TEAMMATE(full_name, team_id, connection) AS
                  (SELECT P.full_name, P.team_id, 3
                  FROM Player P JOIN THIRD_TEAM TT ON P.team_id = TT.team_id
                  WHERE P.full_name != '${name}' AND
                        P.full_name NOT IN (SELECT full_name FROM FIRST_TEAMMATE) AND
                        P.full_name NOT IN (SELECT full_name FROM SECOND_TEAMMATE))
                SELECT connection, COUNT(full_name) AS numPlayer
                FROM FIRST_TEAMMATE
                GROUP BY connection
                UNION
                SELECT connection, COUNT(full_name) AS numPlayer
                FROM SECOND_TEAMMATE
                GROUP BY connection
                UNION
                SELECT connection, COUNT(full_name) AS numPlayer
                FROM THIRD_TEAMMATE TT
                GROUP BY connection;
                `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}


const playerSalaryPerSeason = async(db, id) => {
  const query =`
              SELECT * FROM
              (SELECT id, namePlayerBREF AS 'namePlayer', player.nameTeam AS 'nameTeam', player.slugSeason AS slugSeason, salaryFromPlayer, salaryAcrossTeam,
              if(salaryFromPlayer > salaryAcrossTeam, 1, 0) AS valuedPlayer
              FROM (SELECT id, namePlayerBREF, nameTeam, slugSeason, SUM(amountSalary) as 'salaryFromPlayer'
                    FROM Player_Bios
                    WHERE nameTable = 'Salaries'
                    GROUP BY id, namePlayerBREF, slugSeason, nameTeam
                    ORDER BY id, slugSeason) AS player
              JOIN (SELECT slugSeason, nameTeam, AVG(amountSalary) as 'salaryAcrossTeam'
                    FROM Player_Bios
                    GROUP BY slugSeason, nameTeam) AS team
              ON player.slugSeason = team.slugSeason AND player.nameTeam = team.nameTeam) t
              WHERE id = ${id};
              `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}

// Team Page
const teamSearch = async(db, params) =>{
  const query = `
              SELECT id as team_id, full_name, abbreviation, nickname, city, state, year_founded, arena, owner, d_league_affiliation
              FROM Team
              WHERE (abbreviation = '${params.name}' OR full_name LIKE '%${params.name}%') AND
                    year_founded >= ${params.year_founded_min} AND year_founded <= ${params.year_founded_max} AND
                    city LIKE '%${params.city}%' AND
                    state LIKE '%${params.state}%' AND
                    arena LIKE '%${params.arena}%' AND
                    owner LIKE '%${params.owner}%';
                `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}

const teamSalaryPerWin = async(db, name) =>{
  const query =`
          SELECT TW.season, TW.win_count, TS.salary, TS.salary / TW.win_count AS salary_per_win
          FROM (SELECT season, COUNT(game_id) AS win_count
                FROM Game
                WHERE (team_name_home = '${name}' AND wl_home = 'W') OR 
                      (team_name_away = '${name}' AND wl_away = 'W')
                GROUP BY season) AS TW
              JOIN (SELECT * FROM (SELECT CAST(LEFT(slugSeason, 4) AS SIGNED) AS season, nameTeam AS team_name, SUM(amountSalary) AS salary FROM Player_Bios
                                  WHERE nameTable = 'Salaries' AND 
                                        nameTeam IS NOT NULL
                                  GROUP BY season, nameTeam
                                  UNION
                                  SELECT 2020 AS season, full_name AS team_name, salary_20_21 AS salary
                                  FROM Team) AS Salary
                    WHERE team_name = '${name}') AS TS
              ON TW.season = TS.season
          ORDER BY season;
          `;
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}

const teamPlayerFlow10 = async(db, name) =>{
  const query = `
        SELECT player_id.id AS id, full_name, nameTeam AS nextTeam, prevTeam, transferYear,
          CASE
              WHEN prevTeam LIKE '${name}' THEN 'Out'
              ELSE 'In' END AS status
        FROM
        (SELECT id, full_name
        FROM Player) AS player_id
        JOIN
        (SELECT id, nameTeam, prevTeam,
              SUBSTRING(slugSeason, 1, 4) AS transferYear
        FROM
          (SELECT id, nameTeam, slugSeason,
                  IFNULL(lag(nameTeam) OVER (PARTITION BY id), 'N/A') AS prevTeam
          FROM Player_Bios
          WHERE nameTable = 'Salaries')
          AS T
        WHERE nameTeam != prevTeam) AS wholeRecords
        ON player_id.id = wholeRecords.id
        WHERE
        prevTeam LIKE '${name}' OR
          nameTeam LIKE '${name}'
        ORDER BY transferYear desc
        limit 10
        ;
                `
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
}



module.exports = {
  connect,
  gameOfTheSeason,
  allTimeTop10,
  funFact,
  gameSearch,
  gameTeamStats,
  playerSearch,
  playerNetwork,
  playerSalaryPerSeason,
  teamSearch,
  teamSalaryPerWin,
  teamPlayerFlow10
};