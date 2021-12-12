import React from 'react';
import NavBar from './Navbar';
import '../styles/Team.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Table,
} from 'antd'
import { BidirectionalBar, DualAxes } from '@ant-design/charts';

const { Column } = Table;


const Team = () => {

  const data = [
    {
    full_name: 'test',
    abbreviation: 'test',
    nickname: 'test',
    city: 'test',
    state: 'test',
    year_founded: 2021,
    arena: 'test',
    owner: 'test',
    d_league_affiliation: 'test',
  },
  {
    full_name: 'test',
    abbreviation: 'test',
    nickname: 'test',
    city: 'test',
    state: 'test',
    year_founded: 2021,
    arena: 'test',
    owner: 'test',
    d_league_affiliation: 'test',
  },
  {
    full_name: 'test',
    abbreviation: 'test',
    nickname: 'test',
    city: 'test',
    state: 'test',
    year_founded: 2021,
    arena: 'test',
    owner: 'test',
    d_league_affiliation: 'test',
  },
  {
    full_name: 'test',
    abbreviation: 'test',
    nickname: 'test',
    city: 'test',
    state: 'test',
    year_founded: 2021,
    arena: 'test',
    owner: 'test',
    d_league_affiliation: 'test',
  },
]

const dataHome = [
  {
    value: '#Games (Hundreds)',
    'Home': 20,
    'Away': 23,
  },
  {
    value: '#Winning Games (Hundreds)',
    'Home': 10,
    'Away': 10,
  },
  {
    value: '#Losing Games (Hundreds)',
    'Home': 10,
    'Away': 10,
  },
  {
    value: 'Average Winning Points',
    'Home': 3.4,
    'Away': 3.8,
  },
  {
    value: 'Average Losing Points',
    'Home': 4.4,
    'Away': 9.5,
  },
];

const salary_per_win = [
  {
    season: '2000',
    win_count: 10,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2001',
    win_count: 10,
    salary: 1000.483,
    salary_per_win: 100,
  },
  {
    season: '2002',
    win_count: 10,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2003',
    win_count: 10,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2004',
    win_count: 10,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2005',
    win_count: 10,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2006',
    win_count: 19,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2007',
    win_count: 68,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2008',
    win_count: 18,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2009',
    win_count: 8,
    salary: 649.483,
    salary_per_win: 100,
  },
  {
    season: '2010',
    win_count: 16,
    salary: 649.483,
    salary_per_win: 100,
  },
  
];

const bidConfig =  {
  data: dataHome,
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
};

const dualConfig = {
  data: [salary_per_win, salary_per_win],
  xField: 'season',
  yField: ['win_count', 'salary_per_win'],
  limitInPlot: false,
  padding: [10, 20, 80, 30],
  // 需要设置底部 padding 值，同 css
  slider: {},
  meta: {
    season: {
      sync: false, // 开启之后 slider 无法重绘
    },
  },
  geometryOptions: [
    {
      geometry: 'column',
    },
    {
      geometry: 'line',
    },
    {
      geometry: 'line',
    },
  ],
};


  return (
    <div className="teampage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="team-main-page">
        <div className="team-search-field">
          <div className="team-search-title">Team Search</div>
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Team Name</label>
                  <FormInput placeholder="Team Name" value="" />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>Year Founded</label>
                  <FormInput value="" type="number"/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>State</label>
                  <FormInput value=""/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>City</label>
                  <FormInput placeholder="City" value=""/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Arena</label>
                  <FormInput placeholder="Arena" value=""/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Owner</label>
                  <FormInput placeholder="Owner" value=""/>
              </FormGroup>
              <FormGroup style={{ width: '30vw' }}>
                  <Button type="danger" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>
        <div className="team-result-container">
          <div className='team-output-form'>
            <div className='team-search-output-title'>Search Results</div>
            <Table dataSource={data}>
              <Column title="Name" dataIndex="full_name" key="full_name" />
              <Column title="Abbreviation" dataIndex="abbreviation" key="abbreviation"/>
              <Column title="Nickname" dataIndex="nickname" key="nickname"/>
              <Column title="City" dataIndex="city" key="city"/>
              <Column title="State" dataIndex="state" key="state"/>
              <Column title="Year Founded" dataIndex="year_founded" key="year_founded"/>
              <Column title="Owner" dataIndex="owner" key="owner"/>
              <Column title="D League" dataIndex="d_league_affiliation" key="d_league_affiliation"/>
            </Table>
          </div>
          <div className='team-performance'>
            <div className='team-performance-title'> Team History Performances</div>
            <BidirectionalBar {...bidConfig} />
          </div>
          <div className='team-salary-per-win'>
          <div className='team-salary-per-win-title'> Salary Per Win By Season</div>
            <DualAxes {...dualConfig} />
          </div>
          <div className='team-player_flow_of_year'>
            <div className='team-player_flow_of_year-title'>Player Flow</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;