import React from 'react';
import NavBar from './Navbar';
import '../styles/Game.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Slider,
  Table,
  Pagination,
  Row,
  Col,
  Divider,
  Select
} from 'antd'

const { Column, ColumnGroup } = Table;

const Game = () => {

  const data = [
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
            <Divider />
              <Table dataSource={data}>
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
            {/* card */}
            {/* basic bullet plot */}
          </div>
          <div className="game-stats-home-away"></div>
        </div>
      </div>
    </div>
  );
}

export default Game;