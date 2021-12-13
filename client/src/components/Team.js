import React, { useEffect, useState } from 'react';
// import ReactFlow from 'react-flow-renderer';
import NavBar from './Navbar';
import '../styles/Team.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Table,
  Slider,
} from 'antd'
import { BidirectionalBar, DualAxes,FlowAnalysisGraph } from '@ant-design/charts';
import { teamSearch, getGameTeamStats, getTeamSalaryPerWin, getTeamPlayerFlow } from './fetchers';

const { Column } = Table;


const Team = () => {

  const [name, setName] = useState();
  const [year_founded_min, set_year_founded_min] = useState();
  const [year_founded_max, set_year_founded_max] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [arena, setArena] = useState();
  const [owner, setOwner] = useState();

  const [result, setResult] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(window.location.search ? window.location.search.substring(1).split('&')[0].split('=')[1] : 1610612737);
  const [selectedDetails, setSelectedDetials] = useState();
  const [abbrevation, setAbbreviation]= useState(window.location.search ? window.location.search.substring(1).split('&')[1].split('=')[1] : 'ATL');
  const [full_name, set_full_name]= useState(window.location.search ? window.location.search.substring(1).split('&')[2].split('=')[1] : 'Atlanta%20Hawks');
  const [teamPerformance, setTeamPerformace] = useState();
  const [salary_per_win, set_salary_per_win] = useState();
  const [playerFlow, setPlayerFlow] = useState();

  useEffect(()=>{
    const params = {name, year_founded_min,year_founded_max,state,city,arena,owner};
    
    teamSearch(params).then((res) => {
      // console.log(res.data);
      setResult(res.data);
    })

    getGameTeamStats(abbrevation).then((res)=>{
      // console.log(res.data);
      const data = [
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
      setTeamPerformace(data);
    })

    getTeamSalaryPerWin(full_name).then((res) =>{
      // console.log(res.data);
      set_salary_per_win(res.data);
    })

    getTeamPlayerFlow(full_name).then((res) =>{
      console.log(res.data);
      const data = res.data;
      const inTeam = data.filter(a => a.status==='In');
      const outTeam = data.filter(a => a.status==='Out');
      // console.log(inTeam);
      // console.log(outTeam);

      const cleaned = full_name.split('%20')[0] + ' ' + full_name.split('%20')[1];
      const inNodes = inTeam.map((a) => {
       return {
          id: a.full_name,
          value: {
            title: a.full_name,
            items: [
              {
                text: 'Previous Team',
                value: a.prevTeam,
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
              },
            ],
          },
        }
      });

      const inEdges = inTeam.map((a) => {
        return  {
          source: a.full_name,
          target: cleaned,
          // value: 'to',
        }
       });
      

      const currNode = {
        id: cleaned,
        value: {
          title: cleaned,
          items: [
            {
              // text: cleaned,
              // value: cleaned,
              // icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      };

      const outNodes = outTeam.map((a) => {
        return {
           id: a.full_name,
           value: {
             title: a.full_name,
             items: [
               {
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
                 text: 'Next Team',
                 value: a.nextTeam,
               },
             ],
           },
         }
       });

       const outEdges = outTeam.map((a) => {
        return  {
          source: cleaned,
          target: a.full_name,
        }
       });

       const nodes = inNodes.concat(currNode, outNodes);
       const edges = inEdges.concat(outEdges);
       setPlayerFlow({nodes,edges});
       
    })
  },[])


  const submitSearch = (e) => {
    e.preventDefault();
    const params = {name, year_founded_min,year_founded_max,state,city,arena,owner};
    console.log(params);
    teamSearch(params).then((res) => {
      console.log(res.data);
      setResult(res.data);
    })
  }

  const getTeamDetails = (record) => {
    window.location = `/team?id=${record.team_id}&abbrev=${record.abbreviation}&name=${record.full_name}`;
  }


const bidConfig =  {
  data: teamPerformance? teamPerformance:[],
  xField: 'value',
  yField: ['Home', 'Away'],
  xAxis: {
    position: 'bottom',
  },
  interactions: [
    {
      type: 'active-region',
    },
  ],
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  color: ['#C9082A','#17408B']
};

const dualConfig = {
  data: salary_per_win ? [salary_per_win, salary_per_win] : [[],[]],
  xField: 'season',
  yField: ['win_count', 'salary_per_win'],
  limitInPlot: false,
  padding: [10, 20, 80, 30],
  slider: {},
  meta: {
    season: {
      sync: false, 
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


const flowConfig = {
  data: playerFlow ? playerFlow : {edges:[], nodes:[]},
  // layout:{
  //   center: [-1,-1],
  // },
  fitCenter:false,
  nodeCfg: {
    size: [300, 30],
    items: {
      containerStyle: {
        fill: '#fff',
      },
      padding: 6,
      style: (cfg, group, type) => {
        const styles = {
          icon: {
            width: 12,
            height: 12,
          },
          value: {
            fill: '#f00',
          },
          text: {
            fill: '#aaa',
          },
        };
        return styles[type];
      },
    },
    nodeStateStyles: {
      hover: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
    title: {
      containerStyle: {
        fill: 'transparent',
      },
      style: {
        fill: '#000',
        fontSize: 15,
      },
    },
    style: {
      fill: '#E6EAF1',
      stroke: '#B2BED5',
      radius: [1, 1, 1, 1],
    },
  },
  edgeCfg: {
    label: {
      style: {
        fill: '#aaa',
        fontSize: 12,
        fillOpacity: 1,
      },
    },
    style: (edge) => {
      const stroke = edge.target === full_name.split('%20')[0] + ' ' + full_name.split('%20')[1] ? '#C9082A':'#17408B';
      return {
        stroke,
        // lineWidth: Math.random() * 10 + 1,
        strokeOpacity: 0.5,
      };
    },
    edgeStateStyles: {
      hover: {
        strokeOpacity: 1,
      },
    },
  },
  markerCfg: (cfg) => {
    const { edges } = playerFlow ? playerFlow : {edges:[]};
    return {
      position: 'right',
      show: edges.find((item) => item.source === cfg.id),
      collapsed: !edges.find((item) => item.source === cfg.id),
    };
  },
};

  return (
    <div className="teampage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="team-main-page">
        <div className="team-search-field">
          <div className="team-search-title">Team Search</div>
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}} onSubmit={submitSearch}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Team Name</label>
                  <FormInput placeholder="Team Name" value={name} onChange={(e) => setName(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>Year Founded</label>
                  <Slider min={1946} max={2021} range defaultValue={[1960, 2021]}  onChange={(value) => {set_year_founded_min(value[0]); set_year_founded_max(value[1])}}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>State</label>
                  <FormInput value={state} onChange={(e) => setState(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>City</label>
                  <FormInput placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Arena</label>
                  <FormInput placeholder="Arena" value={arena} onChange={(e) => setArena(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Owner</label>
                  <FormInput placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)}/>
              </FormGroup>
              <FormGroup style={{ width: '30vw' }}>
                  <Button type="submit" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>
        <div className="team-result-container">
          <div className='team-output-form'>
            <div className='team-search-output-title'>Search Results</div>
            <Table dataSource={result} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}
            onRow={(record, rowIndex) => { return {onClick: e => {getTeamDetails(record)},};}}>
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
            <div className='team-performance-title'>Team History Performances</div>
            <BidirectionalBar {...bidConfig} />
          </div>
          <div className='team-salary-per-win'>
          <div className='team-salary-per-win-title'> Salary Per Win By Season</div>
            <DualAxes {...dualConfig} />
          </div>
          <div className='team-player_flow_of_year'>
            <div className='team-player_flow_of_year-title'> Player Flow </div>
            <FlowAnalysisGraph {...flowConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;