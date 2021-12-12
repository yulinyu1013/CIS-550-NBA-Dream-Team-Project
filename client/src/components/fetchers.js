import axios from 'axios';

const baseURL = 'http://localhost:8080';


// Home Page
export const getGameOfTheSeason = async() => axios.get(`${baseURL}/home/game_of_the_season`);
export const getAllTimeTop10 = async() => axios.get(`${baseURL}/home/nba_all_time`);

// Game Page
export const getFunFact = async() => axios.get(`${baseURL}/game/fun_fact`);
export const gameSearch = async(params) => axios.get(`${baseURL}/game/search`, {params: params});
export const getGameTeamStats = async(teamName) => axios.get(`${baseURL}/game/team_stats`, {params: {name: teamName}});
// Player Page

// Team Page