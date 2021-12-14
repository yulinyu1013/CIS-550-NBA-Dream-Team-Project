import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import '../styles/Player.css'
import { Form, FormInput, FormGroup, Button, FormSelect} from "shards-react";
import {
  Slider,
  Table,
} from 'antd'
import { Radar, Line } from '@ant-design/charts';
import { playerSearch, getPlayerNetwork, getPlayerSalary, getHeadShot } from './fetchers';
import dummy from '../styles/dummy.png';

const { Column } = Table;

const Player = () => {

  const [first_name, set_first_name] = useState();
  const [last_name, set_last_name] = useState();
  const [player_slug, set_player_slug] = useState();
  const [min_salary, set_min_salary] = useState();
  const [pts_low, set_pts_low] = useState(); 
  const [pts_high, set_pts_high] = useState(); 
  const [reb_low, set_reb_low] = useState(); 
  const [reb_high, set_reb_high] = useState(); 
  const [ast_low, set_ast_low] = useState(); 
  const [ast_high, set_ast_high] = useState(); 
  const [position, set_position] = useState('All'); 

  const [result, setResult] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(window.location.search ? window.location.search.substring(1).split('&')[0].split('=')[1] : 2);
  const [selectedDetails, setSelectedDetials] = useState();
  const [radarData, setRadarData] = useState();
  const [full_name, set_full_name] = useState(window.location.search ? window.location.search.substring(1).split('&')[1].split('=')[1] : 'Byron%20Scott');
  const [firstConn, setFirstConn] = useState();
  const [secondConn, setSecondConn] = useState();
  const [thirdConn, setThirdConn] = useState();
  const [salaryData, setSalaryData] = useState();
  const [imgUrl, setImgUrl] = useState(dummy);
  
  // render page
  useEffect(() =>{
    const params = { first_name, last_name, player_slug, min_salary,
      pts_low,pts_high,reb_low,reb_high,ast_low,ast_high,position
    };

   playerSearch(params).then((res)=>{
    //  get search result
    setResult(res.data);

    // get result for the selected record
    const selected = res.data.filter(a => a.player_id===parseInt(selectedPlayerId))[0];
    setSelectedDetials(selected);
    
    const radar = [
      {
        name: 'Points',
        star: selected.pts,
      },
      {
        name: 'Assists',
        star: selected.ast,
      },
      {
        name: 'Rebounds',
        star: selected.reb,
      },
    ];

    setRadarData(radar);
    
    getPlayerNetwork(full_name).then((res) => {
      setFirstConn(res.data[0]?  res.data[0].numPlayer: 0);
      setSecondConn(res.data[1] ? res.data[1].numPlayer: 0);
      setThirdConn(res.data[2] ? res.data[2].numPlayer: 0);
      })
    });

    getPlayerSalary(selectedPlayerId).then((res) => {
      const data = res.data;
      const playerS = data.map((a) => {
       return {season: a.slugSeason, type:'Player Salary', value: parseFloat(a.salaryFromPlayer)};
      });
      const teamAvg = data.map((a) => {
        return {season: a.slugSeason, type:'Team Average Salary', value: parseFloat(a.salaryAcrossTeam)};
       });
      const cleaned = playerS.concat(teamAvg);
      setSalaryData(cleaned);
    });

    getHeadShot(selectedPlayerId).then((res) =>{
      setImgUrl(`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${selectedPlayerId}.png`);
    })
  },[])

  const submitSearch = (e) => {
    e.preventDefault();
    const params = { first_name, last_name, player_slug, min_salary,
      pts_low,pts_high,reb_low,reb_high,ast_low,ast_high,position
    };
    playerSearch(params).then((res) => {
      setResult(res.data);
    })
  }

  const getPlayerDetails = (record) => {
    window.location = `/player?id=${record.player_id}&name=${record.full_name}`;
  }

  const radarConfig = {
    data: radarData ? radarData.map((d) => ({ ...d, star: d.star })): [],
    xField: 'name',
    yField: 'star',
    appendPadding: [10, 10, 10, 10],
    meta: {
      star: {
        alias: 'points',
        min: 0,
        max: 32,
        nice: true,
        formatter: (v) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    point: {
      size: 2,
    },
    area: {},
    color: '#c9082a'
  };

  const lineConfig = {
    data: salaryData ? salaryData : [],
    xField: 'season',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v) => `$${Math.round(v).toLocaleString("en-US")}`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 6000,
      },
    },
    color: ['#d62728', '#2ca02c', '#000000'],
  };

  return (
    <div className="playerpage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="player-main-page">
        <div className="player-search-field">
          <div className="player-search-title">Player Search</div>
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}} onSubmit={submitSearch}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Last Name</label>
                  <FormInput placeholder="Last Name" value={last_name} onChange={(e) => set_last_name(e.target.value)} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>First Name</label>
                  <FormInput placeholder="First Name"  value={first_name} onChange={(e) => set_first_name(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Slug</label>
                  <FormInput placeholder="Player Slug" value={player_slug} onChange={(e) => set_player_slug(e.target.value)} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Minimum Salary</label>
                  <FormInput type='number' placeholder="Salary" value={min_salary} onChange={(e) => set_min_salary(e.target.value)} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Points</label>
                  <Slider max={50} range defaultValue={[0, 50]}  onChange={(value) => {set_pts_low(value[0]); set_pts_high(value[1])}}/>
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Assists</label>
                  <Slider max={30} range defaultValue={[0, 30]} onChange={(value) => {set_ast_low(value[0]); set_ast_high(value[1])}}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Rebounds</label>
                  <Slider max={30} range defaultValue={[0, 30]} onChange={(value) => {set_reb_low(value[0]); set_reb_high(value[1])}}/>
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Position</label>
                  <FormSelect onChange={(e) => set_position(e.target.value)}>
                    <option value='All' >All</option>
                    <option value='Guard' >Guard</option>
                    <option value='Center' >Center</option>
                    <option value='Guard-Forward' >Guard-Forward</option>
                    <option value='Forward' >Forward</option>
                    <option value='Forward-Center' >Forward-Center</option>
                    <option value='Center-Forward' >Center-Forward</option>
                    <option value='Forward-Guard' >Forward-Guard</option>
                  </FormSelect>
              </FormGroup>

              <FormGroup style={{ width: '30vw' }}>
                  <Button type="danger" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>
        <div className="player-result-container">
          <div className='player-output-form'>
            <div className='player-search-output-title'>Search Results</div>
            <Table dataSource={result} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}
            onRow={(record, rowIndex) => { return {onClick: e => {getPlayerDetails(record)},};}}
            rowClassName={(record, rowIndex) => (rowIndex % 2 === 0 ? 'player-row-even' : 'player-row-odd')}
            >
              <Column title="Name" dataIndex="full_name" key="full_name" sorter= {(a, b) => a.full_name.localeCompare(b.full_name)}/>
              <Column title="Slug" dataIndex="player_slug" key="player_slug"/>
              <Column title="Team" dataIndex="team" key="team"/>
              <Column title="Postion" dataIndex="position" key="position" sorter= {(a, b) => a.position.localeCompare(b.position)}/>
              <Column title="Points" dataIndex="pts" key="pts" sorter= {(a, b) => a.pts - b.pts}/>
              <Column title="Assists" dataIndex="ast" key="ast" sorter= {(a, b) => a.ast - b.ast}/>
              <Column title="Rebounds" dataIndex="reb" key="reb" sorter= {(a, b) => a.reb - b.reb}/>
            </Table>
          </div>
          <div className='player-detail-vis'>
            <div className='player-detail-title'>Player Details</div>
            <div className='player-info-container'>
              <div className='player-profile'>
                <img src={imgUrl}></img>
                <div className='player-name'>{selectedDetails ? selectedDetails.full_name : ''}</div>
              </div>
              <div className='player-info'>
                <div className='player-team'>Team: {selectedDetails ? selectedDetails.team : ''}</div>
                <div className='player-position'>Position: {selectedDetails ? selectedDetails.position : ''}</div>
                <div className='player-height'>Height: {selectedDetails ? selectedDetails.height : ''}</div>
                <div className='player-weight'>Weight: {selectedDetails ? selectedDetails.weight : ''}</div>
                <div className='player-prior-school'>Prior School: {selectedDetails ? selectedDetails.school : ''}</div>
                <div className='player-from-to-year'>Seasons: {selectedDetails ? selectedDetails.from_year : ''}-{selectedDetails ? selectedDetails.to_year : ''}</div>
                <div className='player-jersey'>Jersey: {selectedDetails ? selectedDetails.jersey : ''}</div>
                <div className='player-all-star'>All Star Appearance: {selectedDetails ? selectedDetails.all_star_appearances : ''}</div>
                <div className='player-1-conn'>#First Teammates: {firstConn ? firstConn : 0}</div>
                <div className='player-2-conn'>#Second Teammates: {secondConn ? secondConn : 0}</div>
                <div className='player-3-conn'>#Third Teammates: {thirdConn ? thirdConn : 0}</div>
              </div>
              <div className='player-radar-chart'>
                <Radar {...radarConfig} />
              </div>
            </div>
          </div>
          <div className='player-salary-season'>
            <div className='player-salary-season-title'>Player Salary By Season</div>
            <Line {...lineConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
