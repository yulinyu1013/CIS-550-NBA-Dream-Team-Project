import React from 'react';
import NavBar from './Navbar';
import '../styles/Team.css'
import { Form, FormInput, FormGroup, Button} from "shards-react";
import {
  Slider,
} from 'antd'

const Team = () => {
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
                  <Slider range defaultValue={[1960, 2021]} />
              </FormGroup>
              <FormGroup style={{ width: '20vw', margin: '10px auto' }}>
                  <label>State</label>
                  <FormInput value="" />
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
        <div className="team-result-container"></div>
      </div>
    </div>
  );
}

export default Team;