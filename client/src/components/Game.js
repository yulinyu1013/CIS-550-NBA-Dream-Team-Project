import React from 'react';
import NavBar from './Navbar';
import '../styles/Game.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Slider,
} from 'antd'

const Game = () => {
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
        <div className="game-result-container"></div>
      </div>
    </div>
  );
}

export default Game;