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
  try {
    const result = await lib.funFact(db);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }

}

const gameSearchHandler = async(req, res) => {
  console.log('connect to search api...');
  console.log(req.url);
  const home = req.query.home ? req.query.home : "";
  const away = req.query.away ? req.query.away : "";
  const date = req.query.date ? req.query.date : "";

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
  
  const params ={home,away,date,
    pts_home_low,pts_home_high,reb_home_low,reb_home_high,ast_home_low,ast_home_high,
    pts_away_low,pts_away_high,reb_away_low,reb_away_high,ast_away_low,ast_away_high
  };
  console.log(params);
  try {
    const results = await lib.gameSearch(db,params);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

}

const gameTeamStatsHandler = async(req, res) => {
  try {
    const results = await lib.gameTeamStats(db,req.query.name);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// Player Page

// Team Page


module.exports = {
  gameOfTheSeasonHandler,
  allTimeTop10Handler,
  funFactHandler,
  gameSearchHandler,
  gameTeamStatsHandler
};