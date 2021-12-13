import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import '../styles/Game.css'
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle} from "shards-react";
import {
  Slider,
  Table,
  Row,
  Col,
} from 'antd'
import { BidirectionalBar } from '@ant-design/charts';
import { getFunFact, gameSearch, getGameTeamStats } from './fetchers';

const { Column, ColumnGroup } = Table;


const Game = () => {

  // game search
  const [home, setHome] = useState();
  const [away, setAway] = useState();
  const [date, setDate] = useState();

  const [pts_home_low, set_pts_home_low] = useState(); 
  const [pts_home_high, set_pts_home_high] = useState(); 
  const [reb_home_low, set_reb_home_low] = useState(); 
  const [reb_home_high, set_reb_home_high] = useState(); 
  const [ast_home_low, set_ast_home_low] = useState(); 
  const [ast_home_high, set_ast_home_high] = useState(); 
  
  const [pts_away_low, set_pts_away_low] = useState(); 
  const [pts_away_high, set_pts_away_high] = useState(); 
  const [reb_away_low, set_reb_away_low] = useState(); 
  const [reb_away_high, set_reb_away_high] = useState(); 
  const [ast_away_low, set_ast_away_low] = useState(); 
  const [ast_away_high, set_ast_away_high] = useState(); 

  const [result, setResult] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(window.location.search ? window.location.search.substring(1).split('&')[0].split('=')[1] : 20000001);
  const [selectedDetails, setSelectedDetials] = useState();

  const [homeTeam, setHomeTeam] = useState(window.location.search ? window.location.search.substring(1).split('&')[1].split('=')[1] : 'NYK');
  const [awayTeam, setAwayTeam] = useState(window.location.search ? window.location.search.substring(1).split('&')[2].split('=')[1] : 'PHI');
  const [homeTeamStats, setHomeTeamStats] = useState([]);
  const [awayTeamStats, setAwayTeamStats] = useState([]);
  const [funfact, setFunfact] = useState({});

  useEffect(() =>{
    getFunFact().then((res) => {
      setFunfact(res.data);
    });
    const params ={home,away,date,
      pts_home_low,pts_home_high,reb_home_low,reb_home_high,ast_home_low,ast_home_high,
      pts_away_low,pts_away_high,reb_away_low,reb_away_high,ast_away_low,ast_away_high
    };

    gameSearch(params).then((res)=>{
      setResult(res.data);
      console.log(res.data.filter(a => a.game_id===parseInt(selectedGameId))[0]);
      setSelectedDetials(res.data.filter(a => a.game_id===parseInt(selectedGameId))[0]);
    });

    getGameTeamStats(homeTeam).then((res)=>{
      console.log(res.data);
      const dataHome = [
        {
          value: '#Games (Hundreds)',
          'Home': res.data[0].count/100,
          'Away': res.data[1].count/100,
        },
        {
          value: '#Winning Games (Hundreds)',
          'Home': res.data[0].win/100,
          'Away': res.data[1].win/100,
        },
        {
          value: '#Losing Games (Hundreds)',
          'Home': res.data[0].lost/100,
          'Away': res.data[1].lost/100,
        },
        {
          value: 'Average Winning Points',
          'Home': parseFloat(res.data[0].avg_win_pts),
          'Away': parseFloat(res.data[1].avg_win_pts),
        },
        {
          value: 'Average Losing Points',
          'Home': -parseFloat(res.data[0].avg_lost_pts),
          'Away': -parseFloat(res.data[1].avg_lost_pts),
        },
      ];
      setHomeTeamStats(dataHome);

    })

    getGameTeamStats(awayTeam).then((res)=>{
      console.log(res.data);
      const dataAway = [
        {
          value: '#Games (Hundreds)',
          'Home': res.data[0].count/100,
          'Away': res.data[1].count/100,
        },
        {
          value: '#Winning Games (Hundreds)',
          'Home': res.data[0].win/100,
          'Away': res.data[1].win/100,
        },
        {
          value: '#Losing Games (Hundreds)',
          'Home': res.data[0].lost/100,
          'Away': res.data[1].lost/100,
        },
        {
          value: 'Average Winning Points',
          'Home': parseFloat(res.data[0].avg_win_pts),
          'Away': parseFloat(res.data[1].avg_win_pts),
        },
        {
          value: 'Average Losing Points',
          'Home': -parseFloat(res.data[0].avg_lost_pts),
          'Away': -parseFloat(res.data[1].avg_lost_pts),
        },
      ];
      setAwayTeamStats(dataAway);
    })

  },[])


  const submitSearch = (e) => {
    e.preventDefault();
    const params ={home,away,date,
      pts_home_low,pts_home_high,reb_home_low,reb_home_high,ast_home_low,ast_home_high,
      pts_away_low,pts_away_high,reb_away_low,reb_away_high,ast_away_low,ast_away_high
    };
    console.log(params);
    gameSearch(params).then((res) => {
      console.log(res.data);
      setResult(res.data);
    })
  }

  const getGameDetails = (record) => {
    window.location = `/game?id=${record.game_id}&home=${record.team_abbreviation_home}&away=${record.team_abbreviation_away}`;
  }



  const config = (data) => {
    return {
    data: data,
    xField: 'value',
    xAxis: {
      position: 'bottom',
    },
    interactions: [
      {
        type: 'active-region',
      },
    ],
    yField: ['Home', 'Away'],
    tooltip: {
      shared: true,
      showMarkers: false,
    },
    color: ['#C9082A','#17408B']
  }};

  return (
    <div className="gamepage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="game-main-page">
        <div className="game-search-field">
          <div className="game-search-title">Game Search</div>
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}} onSubmit={submitSearch}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Team</label>
                  <FormInput placeholder="Home Team" value={home} onChange={(e) => setHome(e.target.value)} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>Away Team</label>
                  <FormInput placeholder="Away Team" value={away} onChange={(e) => setAway(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Date</label>
                  <FormInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Points</label>
                  <Slider max={200} range defaultValue={[0, 200]} onChange={(value) => {set_pts_home_low(value[0]); set_pts_home_high(value[1])}}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Points</label>
                  <Slider max={200} trackStyle={{color:'red'}} range defaultValue={[0, 200]} onChange={(value) => {set_pts_away_low(value[0]); set_pts_away_high(value[1])}}/>
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Rebound</label>
                  <Slider range defaultValue={[0, 100]} onChange={(value) => {set_reb_home_low(value[0]); set_reb_home_high(value[1])}}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Rebound</label>
                  <Slider range defaultValue={[0, 100]} onChange={(value) => {set_reb_away_low(value[0]); set_reb_away_high(value[1])}}/>
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Assists</label>
                  <Slider range defaultValue={[0, 100]} onChange={(value) => {set_ast_home_low(value[0]); set_ast_home_high(value[1])}}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Assists</label>
                  <Slider type="danger" range defaultValue={[0, 100]} onChange={(value) => {set_ast_away_low(value[0]); set_ast_away_high(value[1])}}/>
              </FormGroup>

              <FormGroup style={{ width: '30vw' }}>
                  <Button type="danger" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>

        <div className="game-result-container">
          <div className="fun-fact">
            <div className="fun-fact-title">Fun Fact!</div>
            <div className="fun-fact-content">
              The home team {funfact.home_team}, 
              which was founded in {funfact.home_team_found} won {funfact.home_win} out of {funfact.total_match} matches against {funfact.away_team}, 
              which was founded in {funfact.away_team_found}. 
              The most valuable player in {funfact.home_team} history is {funfact.home_mvp} who earned ${funfact.home_mvp_salary} for a season 
              while the most valuable player in {funfact.away_team} history is {funfact.away_mvp} who earned ${funfact.away_mvp_salary} for a season.
            </div>
          </div>
          <div className="game-output-form">
            <div className='game-search-output-title'>Search Results</div>
            {/* <Divider /> */}
            <Table dataSource={result} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}
            onRow={(record, rowIndex) => { return {onClick: e => {getGameDetails(record)},};}}
            >
              <ColumnGroup title="Team">
                <Column title="Home Team" dataIndex="team_name_home" key="team_name_home" sorter= {(a, b) => a.team_name_home.localeCompare(b.team_name_home)}/>
                <Column title="Abbreviation" dataIndex="team_abbreviation_home" key="team_abbreviation_home" />
                <Column title="Away Team" dataIndex="team_name_away" key="team_name_away" sorter= {(a, b) => a.team_name_away.localeCompare(b.team_name_away)}/>
                <Column title="Abbreviation" dataIndex="team_abbreviation_away" key="team_abbreviation_away" />
              </ColumnGroup>
              <ColumnGroup title="Points">
                <Column title="Home Points" dataIndex="pts_home" key="pts_home" sorter= {(a, b) => a.pts_home - b.pts_home}/>
                <Column title="Away Points" dataIndex="pts_away" key="pts_away" sorter= {(a, b) => a.pts_away - b.pts_away}/>
              </ColumnGroup>
              <ColumnGroup title="Assists">
                <Column title="Home Assists" dataIndex="ast_home" key="ast_home" sorter= {(a, b) => a.ast_home - b.ast_home}/>
                <Column title="Away Assists" dataIndex="ast_away" key="ast_away" sorter= {(a, b) => a.ast_away - b.ast_away}/>
              </ColumnGroup>
              <ColumnGroup title="Rebounds">
                <Column title="Home Rebounds" dataIndex="reb_home" key="reb_home" sorter= {(a, b) => a.reb_home - b.reb_home}/>
                <Column title="Away Rebounds" dataIndex="reb_away" key="reb_away" sorter= {(a, b) => a.reb_away - b.reb_away}/>
              </ColumnGroup>
              <Column title="Date" dataIndex="game_date" key="game_date"/>
            </Table>
          </div>
          <div className="game-detail-vis">
            <div className='game-detail-title'>Game Statistics</div>
            {selectedDetails ? <Card>
              <CardBody>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col flex={2} style={{ textAlign: 'left' }}>
                        <CardTitle>Home(logo)</CardTitle>
                      </Col>
                      <Col flex={2} style={{ textAlign: 'center' }}>
                          VS
                      </Col>
                      <Col flex={2} style={{ textAlign: 'right' }}>
                          <CardTitle>Away(logo)</CardTitle>
                      </Col>
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                    <Col flex={2} style={{ textAlign: 'left' }}>
                        <CardTitle>{selectedDetails.team_name_home}</CardTitle>
                      </Col>
                      <Col flex={2} style={{ textAlign: 'center' }}>
                          {selectedDetails.game_date}
                      </Col>
                      <Col flex={2} style={{ textAlign: 'right' }}>
                        <CardTitle>{selectedDetails.team_name_away}</CardTitle>
                      </Col>
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.pts_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Points
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.pts_away}</h6>
                      </Col >
            
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.reb_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Rebounds
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.reb_away}</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.ast_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Assists
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.ast_away}</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.fgm_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Field Goals Made
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.fgm_home}</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.ftm_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Free Throw Made
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.ftm_away}</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.fta_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Free Throw Attempted
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.fta_away}</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>{selectedDetails.pf_home}</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Personal Foul
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>{selectedDetails.pf_away}</h6>
                      </Col >
                  </Row>
              </CardBody>
            </Card>
            : null}
          </div>
          <div className="game-stats-home-away">
            <div className='game-teams-history-title'>Performance History of Teams</div>
            <div className='game-teams-history-chart'>
              <div className="curr-home">
                { selectedDetails ? selectedDetails.team_name_home: 'Home'}
                <BidirectionalBar {...config(homeTeamStats)} />
              </div>
              <div className='curr-away'>
                {selectedDetails ? selectedDetails.team_name_away : 'Away'}
                <BidirectionalBar {...config(awayTeamStats)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;