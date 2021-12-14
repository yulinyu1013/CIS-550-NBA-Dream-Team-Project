const express = require('express');
const cors = require('cors');
const path = require('path');

const webapp = express();

webapp.use(cors());

webapp.use(express.json());

webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(path.join(__dirname, './uploads'), express.static(path.join(__dirname, './uploads')));
webapp.use(express.static(path.join(__dirname, './client/build')));

const routes = require('./routes');

// Home Page
webapp.get('/home/game_of_the_season', routes.gameOfTheSeasonHandler);
webapp.get('/home/nba_all_time', routes.allTimeTop10Handler);

// Game Page
webapp.get('/game/fun_fact', routes.funFactHandler);
webapp.get('/game/search', routes.gameSearchHandler);
webapp.get('/game/team_stats', routes.gameTeamStatsHandler);

// Player Page
webapp.get('/player/search', routes.playerSearchHandler);
webapp.get('/player/network', routes.playNetworkHandler);
webapp.get('/player/salary', routes.playerSalaryPerSeasonHandler);

// Team Page
webapp.get('/team/search', routes.teamSearchHandler);
webapp.get('/team/salary_per_win', routes.teamSalaryPerWinHandler);
webapp.get('/team/player_flow_recent', routes.teamPlayerFlow10Handler);


webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// prevent unwarranted endpoint access
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

module.exports = webapp;