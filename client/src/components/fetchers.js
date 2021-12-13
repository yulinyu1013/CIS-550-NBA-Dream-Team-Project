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
export const playerSearch = async(params) => axios.get(`${baseURL}/player/search`, {params: params});
export const getPlayerNetwork =  async(name) => axios.get(`${baseURL}/player/network`, {params: {full_name: name}});
export const getPlayerSalary = async(id) => axios.get(`${baseURL}/player/salary`, {params: {id: id}});

// Team Page
export const teamSearch = async(params) => axios.get(`${baseURL}/team/search`, {params: params});