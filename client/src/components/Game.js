import React from 'react';
import NavBar from './Navbar';
import '../styles/Game.css'
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle} from "shards-react";
import {
  Slider,
  Table,
  Pagination,
  Row,
  Col,
  Divider,
  Select
} from 'antd'

import { BidirectionalBar } from '@ant-design/charts';

const { Column, ColumnGroup } = Table;

const Game = () => {

  const data1 = [
    {
      HomeTeam:'a',
      AwayTeam:'b',
      HomePoints:100,
      HomeAssists:11,
      HomeRebounds:11,
      AwayPoints:100,
      AwayAssists:11,
      AwayRebounds:11,
      Date: "12/12/2021"
    }
  ];

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
  const config = (data) => {
    return {
    data,
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
          <Form theme="danger" style={{ width: '90%', margin: '0 auto', marginTop: '2vh'}}>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Team</label>
                  <FormInput placeholder="Home Team" value="" />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto'}}>
                  <label>Away Team</label>
                  <FormInput placeholder="Away Team" value=""/>
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Date</label>
                  <FormInput value="" />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Points</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Points</label>
                  <Slider trackStyle={{color:'red'}} range defaultValue={[0, 100]} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Rebound</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Rebound</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Home Assists</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Away Assists</label>
                  <Slider type="danger" range defaultValue={[0, 100]} />
              </FormGroup>

              <FormGroup style={{ width: '30vw' }}>
                  <Button type="danger" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>

        <div className="game-result-container">
          <div className="fun-fact">
            <div className="fun-fact-title">Fun Fact!</div>
            <div className="fun-fact-content">tbd...</div>
          </div>
          <div className="game-output-form">
            <div className='game-search-output-title'>Search Results</div>
            {/* <Divider /> */}
              <Table dataSource={data1}>
              <ColumnGroup title="Team">
                <Column title="Home Team" dataIndex="HomeTeam" key="HomeTeam" />
                <Column title="Away Team" dataIndex="AwayTeam" key="AwayTeam" />
              </ColumnGroup>
              <ColumnGroup title="Points">
                <Column title="Home Points" dataIndex="HomePoints" key="HomePoints" />
                <Column title="Away Points" dataIndex="AwayPoints" key="AwayPoints" />
              </ColumnGroup>
              <ColumnGroup title="Assists">
                <Column title="Home Assists" dataIndex="HomeAssists" key="HomeAssists" />
                <Column title="Away Assists" dataIndex="AwayAssists" key="AwayAssists" />
              </ColumnGroup>
              <ColumnGroup title="Rebounds">
                <Column title="Home Rebounds" dataIndex="HomeRebounds" key="HomeRebounds" />
                <Column title="Away Rebounds" dataIndex="AwayRebounds" key="AwayRebounds" />
              </ColumnGroup>
              <Column title="Date" dataIndex="Date" key="Date"/>
              </Table>
          </div>
          <div className="game-detail-vis">
            <div className='game-detail-title'>Game Statistics</div>
            <Card>
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
                        <CardTitle>Home</CardTitle>
                      </Col>
                      <Col flex={2} style={{ textAlign: 'center' }}>
                          Date at Time
                      </Col>
                      <Col flex={2} style={{ textAlign: 'right' }}>
                        <CardTitle>Away</CardTitle>
                      </Col>
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>pts home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Points
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>pts away</h6>
                      </Col >
            
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>rebound_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Rebounds
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>rebound_away</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>assist_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Assists
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>assist_away</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>fgm_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Field Goals Made
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>fgm_away</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>ftm_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Free Throw Made
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>ftm_away</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>fta_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Free Throw Attempted
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>fta_away</h6>
                      </Col >
                  </Row>
                  <Row gutter='30' align='middle' justify='center'>
                      <Col span={9} style={{ textAlign: 'left' }}>
                          <h6>pf_home</h6>
                      </Col >
                      <Col span={6} style={{ textAlign: 'center' }}>
                          Personal Foul
                      </Col >
                      <Col span={9} style={{ textAlign: 'right' }}>
                          <h6>pf_away</h6>
                      </Col >
                  </Row>
              </CardBody>
            </Card>
          </div>
          <div className="game-stats-home-away">
            <div className='game-teams-history-title'>Performance History of Teams</div>
            <div className='game-teams-history-chart'>
              <div className="curr-home">
                Home
                <BidirectionalBar {...config(dataHome)} />
              </div>
              <div className='curr-away'>
                Away
                <BidirectionalBar {...config(dataHome)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;