require('dotenv').config();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.MYSQL_HOST,
    port : 3306,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DB,
  }
});
const lib = require('./dbOperations');
const request = require('supertest');
const webapp = require('./server');

let db;

beforeEach(async () => {
  db = await lib.connect();
})
afterEach(async () => {
  await db.end();
});

describe('Home Page', ()=>{

  it('gets the game of the season', async()=>{
    await request(webapp).get('/home/game_of_the_season').then((res)=>{
      expect(JSON.parse(res.text).team_abbreviation_home).toBe('LAL');
      expect(JSON.parse(res.text).team_abbreviation_away).toBe('LAC');
    })
  })

  it('gets the nba all time', async()=>{
    await request(webapp).get('/home/nba_all_time').then((res)=>{
      expect(JSON.parse(res.text)[0].player).toBe('Bradley Beal');
      expect(JSON.parse(res.text)[10].player).toBe('James Harden');
      expect(JSON.parse(res.text)[20].player).toBe('Wilt Chamberlain');
    })
  })

})

describe('Game Page', ()=>{

  it('fun fact', async() => {
    await request(webapp).get('/game/fun_fact').query({ home_team: 'New Jersey Nets', away_team: 'Cleveland Cavaliers' })
    .then((res)=>{
      expect(JSON.parse(res.text).home_team).toBe('New Jersey Nets');
      expect(JSON.parse(res.text).away_team).toBe('Cleveland Cavaliers');
    })
  })

  it('game search', async() => {
    await request(webapp).get('/game/search').then((res)=>{
      expect(JSON.parse(res.text).length).toBe(60688);
    })
  })

  it('game search with some condition', async() => {
    await request(webapp).get('/game/search').query({home:'LAL'})
    .then((res)=>{
      expect(JSON.parse(res.text).length).toBe(2472);
    })
  })

  it('game team stats - no params', async() => {
    await request(webapp).get('/game/team_stats')
    .expect(404)
    .then((res) =>{
      expect(JSON.parse(res.text).error).toBe('missing team name');
    })
  })

  it('game team stats w/ params', async() => {
    await request(webapp).get('/game/team_stats?name=LAL')
    .then((res) =>{
      expect(JSON.parse(res.text).length).toBe(2);
    })
  })

})

describe('Player Page', ()=>{

  it('player search', async() => {
    await request(webapp).get('/player/search').then((res)=>{
      expect(JSON.parse(res.text).length).toBe(1880);
    })
  })

  it('player search w/ some condition', async() => {
    await request(webapp).get('/player/search').query({first_name:'Byron', last_name: 'Scott'})
    .then((res)=>{
      expect(JSON.parse(res.text).length).toBe(1);
    })

    await request(webapp).get('/player/search').query({min_salary: 'wrong'})
    .then((res)=>{
      expect(JSON.parse(res.text).error).toBe("Error executing the query: Unknown column 'wrong' in 'where clause'");
    })


  })

  it('player network - missing name', async() => {
    await request(webapp).get('/player/network')
    .expect(404)
    .then((res) =>{
      expect(JSON.parse(res.text).error).toBe('missing name');
    })
  })

  it('player network w/ name', async() => {
    await request(webapp).get('/player/network').query({full_name: 'Kobe%20Bryant'})
    .then((res) =>{
      expect(JSON.parse(res.text).length).toBe(3);
    })
  })

  it('player salary - missing id', async() => {
    await request(webapp).get('/player/salary')
    .expect(404)
    .then((res) =>{
      expect(JSON.parse(res.text).error).toBe('missing id');
    })
  })

  it('player salary - with id', async() => {
    await request(webapp).get('/player/salary').query({id: 2})
    .expect(200)
    .then((res) =>{
      expect(JSON.parse(res.text).length).toBe(13);
    })
  })
})

describe('Team Page', ()=>{
  it('team search', async() => {
    await request(webapp).get('/team/search').then((res)=>{
      expect(JSON.parse(res.text).length).toBe(30);
    })
  })

  it('team search w/ some condition', async() => {
    await request(webapp).get('/team/search').query({year_founded_min: 1990})
    .then((res)=>{
      expect(JSON.parse(res.text).length).toBe(3);
    })

    await request(webapp).get('/team/search').query({name: 'A'})
    .then((res)=>{
      expect(JSON.parse(res.text).length).toBe(22);
    })
  })

  it('team salary - missing name', async() => {
    await request(webapp).get('/team/salary_per_win')
    .expect(404)
    .then((res) =>{
      expect(JSON.parse(res.text).error).toBe('missing name');
    })
  })

  it('team salary - with name', async() => {
    await request(webapp).get('/team/salary_per_win').query({name: 'Los%20Angeles%20Lakers'})
    .then((res) =>{
      expect(JSON.parse(res.text).length).toBe(36);
    })
  })

  it('team player flow - missing name', async() => {
    await request(webapp).get('/team/player_flow_recent')
    .expect(404)
    .then((res) =>{
      expect(JSON.parse(res.text).error).toBe('missing name');
    })
  })

  it('team player flow - with name', async() => {
    await request(webapp).get('/team/player_flow_recent').query({name: 'Los%20Angeles%20Lakers'})
    .then((res) =>{
      expect(JSON.parse(res.text).length).toBe(10);
    })
  })
})

test('webapp.use', ()=>{
  request(webapp).get('/undefined_path').expect(404);
})