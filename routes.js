const lib = require('./dbOperations');

// connect to db
let db;
const connectToDb = async () => { db = await lib.connect(); };
connectToDb();


// Home Page

const gameOfTheSeasonHandler = async(req, res) => {
  try {
    const result = await lib.gameOfTheSeason(db);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}

const allTimeTop10Handler = async(req, res) => {
  try {
    const results = await lib.allTimeTop10(db);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}

// Game Page

const funFactHandler = async(req, res) => {
  if(!req.query){
    res.status(404).json({error: 'missing names'});
    return;
  }
  console.log('fun fact api...');
  const {home_team, away_team} = req.query;
  try {
    const result = await lib.funFact(db, {home_team, away_team});
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }

}

const gameSearchHandler = async(req, res) => {
  const home = req.query.home ? req.query.home : "";
  const away = req.query.away ? req.query.away : "";
  const min_date = req.query.min_date ? req.query.min_date : "1946-11-26";
  const max_date = req.query.max_date ? req.query.max_date : "2021-05-16";

  const pts_home_low = req.query.pts_home_low ? req.query.pts_home_low : 0;
  const pts_home_high = req.query.pts_home_high? req.query.pts_home_high : 200;
  const reb_home_low = req.query.reb_home_low ? req.query.reb_home_low : 0;
  const reb_home_high = req.query.reb_home_high? req.query.reb_home_high : 100;
  const ast_home_low = req.query.ast_home_low ? req.query.ast_home_low : 0;
  const ast_home_high = req.query.ast_home_high? req.query.ast_home_high : 100;
  
  const pts_away_low = req.query.pts_away_low ? req.query.pts_away_low : 0;
  const pts_away_high = req.query.pts_away_high? req.query.pts_away_high : 200;
  const reb_away_low = req.query.reb_away_low ? req.query.reb_away_low : 0;
  const reb_away_high = req.query.reb_away_high? req.query.reb_away_high : 100;
  const ast_away_low = req.query.ast_away_low ? req.query.ast_away_low : 0;
  const ast_away_high = req.query.ast_away_high? req.query.ast_away_high : 100;
  
  const params ={home,away,min_date, max_date,
    pts_home_low,pts_home_high,reb_home_low,reb_home_high,ast_home_low,ast_home_high,
    pts_away_low,pts_away_high,reb_away_low,reb_away_high,ast_away_low,ast_away_high
  };

  try {
    const results = await lib.gameSearch(db,params);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const gameTeamStatsHandler = async(req, res) => {
  try {
    if(!req.query.name){
      res.status(404).json({error: 'missing team name'});
      return;
    }
    const results = await lib.gameTeamStats(db,req.query.name);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


// Player Page

const playerSearchHandler = async(req, res) => { 
  const first_name = req.query.first_name ? req.query.first_name : "";
  const last_name = req.query.last_name ? req.query.last_name : "";
  const player_slug = req.query.player_slug ? req.query.player_slug : "";
  const min_salary = req.query.min_salary ?  req.query.min_salary : 0;
  const pts_low = req.query.pts_low ? req.query.pts_low : 0;
  const pts_high = req.query.pts_high? req.query.pts_high : 50;
  const reb_low = req.query.reb_low ? req.query.reb_low : 0;
  const reb_high = req.query.reb_high? req.query.reb_high : 30;
  const ast_low = req.query.ast_low ? req.query.ast_low : 0;
  const ast_high = req.query.ast_high? req.query.ast_high : 30;
  const position = req.query.position==='All' || !req.query.position ? '' : req.query.position;
  
  const params = {first_name, last_name, player_slug, min_salary, pts_low, pts_high, reb_low, reb_high, ast_low, ast_high, position};

  try {
    const results = await lib.playerSearch(db,params);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const playNetworkHandler = async(req, res) => { 
  if(!req.query.full_name){
    res.status(404).json({error: 'missing name'});
    return;
  }

  const {full_name} = req.query;
  const cleaned = full_name.split('%20').join(' ');
  console.log(cleaned);
  try {

    const result = await lib.playerNetwork(db, cleaned);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}

const playerSalaryPerSeasonHandler = async(req, res) => {

  if(!req.query.id){
    res.status(404).json({error: 'missing id'});
    return;
  }

  try {
    const result = await lib.playerSalaryPerSeason(db, req.query.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}


// Team Page

const teamSearchHandler = async(req, res) => {
  const name = req.query.name ? req.query.name : "";
  const year_founded_min = req.query.year_founded_min ? req.query.year_founded_min : 1946;
  const year_founded_max = req.query.year_founded_max ? req.query.year_founded_max : 2021;
  const state = req.query.state ? req.query.state : "";
  const city = req.query.city ? req.query.city : "";
  const arena = req.query.arena ? req.query.arena : "";
  const owner = req.query.owner ? req.query.owner : "";

  const params = {name,year_founded_min,year_founded_max,state,city,arena,owner};

  try {
    const results = await lib.teamSearch(db,params);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

}

const teamSalaryPerWinHandler = async(req, res) => { 
  if(!req.query.name){
    res.status(404).json({error: 'missing name'});
    return;
  }

  const {name} = req.query;
  const cleaned = name.split('%20').join(' ');

  try {
    const result = await lib.teamSalaryPerWin(db, cleaned);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}

const teamPlayerFlow10Handler = async(req, res) => {
  if(!req.query.name){
    res.status(404).json({error: 'missing name'});
    return;
  } 

  const {name} = req.query;
  const cleaned = name.split('%20').join(' ');

  try {
    const result = await lib.teamPlayerFlow10(db, cleaned);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
}


module.exports = {
  gameOfTheSeasonHandler,
  allTimeTop10Handler,
  funFactHandler,
  gameSearchHandler,
  gameTeamStatsHandler,
  playerSearchHandler,
  playNetworkHandler,
  playerSalaryPerSeasonHandler,
  teamSearchHandler,
  teamSalaryPerWinHandler,
  teamPlayerFlow10Handler,
};