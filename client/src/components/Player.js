import React from 'react';
import NavBar from './Navbar';
import '../styles/Player.css'
import { Form, FormInput, FormGroup, Button, FormSelect} from "shards-react";
import {
  Slider,
  Table,
} from 'antd'
import { Radar } from '@ant-design/charts';

const { Column } = Table;

const Player = () => {

  const data = [
    {
      full_name:'test',
      player_slug: 'test',
      last_affiliation: 'test',
      position: 'guard',
      pts: 1,
      ast: 1,
      reb: 1
    },
    {
      full_name:'test',
      player_slug: 'test',
      last_affiliation: 'test',
      position: 'guard',
      pts: 1,
      ast: 1,
      reb: 1
    },
    {
      full_name:'test',
      player_slug: 'test',
      last_affiliation: 'test',
      position: 'guard',
      pts: 1,
      ast: 1,
      reb: 1
    },
    {
      full_name:'test',
      player_slug: 'test',
      last_affiliation: 'test',
      position: 'guard',
      pts: 1,
      ast: 1,
      reb: 1
    },
  ];

  const radarData = [
    {
      name: 'Points',
      star: 10371,
    },
    {
      name: 'Assists',
      star: 7380,
    },
    {
      name: 'Rebounds',
      star: 7414,
    },

  ];
  const radarConfig = {
    data: radarData.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: 'name',
    yField: 'star',
    appendPadding: [10, 10, 10, 10],
    meta: {
      star: {
        alias: 'points',
        min: 0,
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
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };

  return (
    <div className="playerpage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="player-main-page">
        <div className="player-search-field">
          <div className="player-search-title">Player Search</div>
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Last Name</label>
                  <FormInput placeholder="Last Name" value="" />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>First Name</label>
                  <FormInput placeholder="First Name" value=""/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Slug</label>
                  <FormInput placeholder="First Name" value="" />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Salary</label>
                  <FormInput placeholder="Salary" value="" />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Points</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Assist</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Rebound</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Position</label>
                  <FormSelect>
                    <option value="Guard">Guard</option>
                    <option value="Center">Center</option>
                    <option value="Guard-Forward">Guard-Forward</option>
                    <option value="Forward">Forward</option>
                    <option value="Forward-Center">Forward-Center</option>
                    <option value="Center-Forward">Center-Forward</option>
                    <option value="Forward-Guard">Forward-Guard</option>
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
            <Table dataSource={data}>
              <Column title="Name" dataIndex="full_name" key="full_name" />
              <Column title="Slug" dataIndex="player_slug" key="player_slug"/>
              <Column title="Team" dataIndex="last_affiliation" key="last_affiliation"/>
              <Column title="Postion" dataIndex="position" key="position"/>
              <Column title="Points" dataIndex="pts" key="pts"/>
              <Column title="Assists" dataIndex="ast" key="ast"/>
              <Column title="Rebounds" dataIndex="reb" key="reb"/>
            </Table>
          </div>
          <div className='player-detail-vis'>
            <div className='player-profile'>
              image
              <div className='player-name'>Name:</div>
            </div>
            <div className='player-info'>
              <div className='player-team'>Team:</div>
              <div className='player-position'>Position:</div>
              <div className='player-height'>Height:</div>
              <div className='player-weight'>Weight:</div>
              <div className='player-prior-school'>Prior School:</div>
              <div className='player-prior-school'>Prior School:</div>
              <div className='player-from-to-year'>Seasons: </div>
              <div className='player-jersey'>Jersey:</div>
              <div className='player-all-star'>All Star Appearance: </div>
              <div className='player-1-conn'>First Teammates: </div>
              <div className='player-2-conn'>Second Teammates: </div>
              <div className='player-3-conn'>Third Teammates: </div>

            </div>
            <div className='player-radar-chart'>
              <Radar {...radarConfig} />
            </div>
          </div>
          <div className='player-salary-season'></div>
        </div>
      </div>
    </div>
  );
}

export default Player;