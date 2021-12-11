import React from 'react';
import NavBar from './Navbar';
import '../styles/Player.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Slider,
} from 'antd'

const Player = () => {
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
                  <label>Point</label>
                  <FormInput placeholder="Point" value="" />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Assist</label>
                  <Slider range defaultValue={[0, 100]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Rebound</label>
                  <FormInput placeholder="Point" value="" />
              </FormGroup>

              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>Position</label>
                  <FormInput placeholder="Point" value="" />
              </FormGroup>

              <FormGroup style={{ width: '30vw' }}>
                  <Button type="danger" style={{ marginTop: '4vh', marginLeft: '10px' }} >Search</Button>
              </FormGroup>
            </Form>
        </div>
        <div className="player-result-container"></div>
      </div>
    </div>
  );
}

export default Player;