import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'shards-react';
import {
  Row,
  Col,
  Divider,
} from 'antd'
import 'antd/dist/antd.css';
import { getGameOfTheSeason } from './fetchers';

const GameOfTheSeason = () => {

    const [gots,setGots] = useState({});

    useEffect(() => {
        // get game of the season
        getGameOfTheSeason().then((res)=>{
            setGots(res.data);
        })
    },[])

  return (
    <Card>
    <CardBody>
        <Row gutter='30' align='middle' justify='center'>
            <Col flex={2} style={{ textAlign: 'left'}}>
              <CardTitle>
                <div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                        <img src='https://d2p3bygnnzw9w3.cloudfront.net/req/202112021/tlogo/bbr/LAC.png' alt=''/>
                        </div>
                        <div class="flip-box-back">
                            <h2>LAC</h2>
                        </div>
                    </div>
                </div>
              </CardTitle>
            </Col>
            <Col flex={2} style={{ textAlign: 'center' }}>
                <h3>2020-12-22</h3>
            </Col>
            <Col flex={2} style={{ textAlign: 'right'}}>
                <CardTitle style={{width:'125px', marginLeft: 'auto', marginRight:'40px'}}>
                <div class="flip-box-lal">
                    <div class="flip-box-inner-lal">
                        <div class="flip-box-front-lal">
                        <img src='https://d2p3bygnnzw9w3.cloudfront.net/req/202112021/tlogo/bbr/LAL.png' alt=''/>
                        </div>
                        <div class="flip-box-back-lal">
                            <h2>LAL</h2>
                        </div>
                    </div>
                </div>
                </CardTitle>
            </Col>
        </Row>
        <Row gutter='30' align='middle' justify='center'>
          <Col flex={2} style={{ textAlign: 'left'}}>
              <h4>{gots.team_name_away}</h4>
            </Col>
            <Col flex={2} style={{ textAlign: 'center' }}>
             <h4 style={{paddingLeft:'100px'}}>VS</h4>
            </Col>
            <Col flex={2} style={{ textAlign: 'right' }}>
              <h4>{gots.team_name_home}</h4>
            </Col>
        </Row>
        <Divider />
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h4 style={{color: '#C9082A'}}>{gots.pts_away}</h4>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h4>Points</h4>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h4 style={{color: '#17408B'}}>{gots.pts_home}</h4>
            </Col >
  
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h4 style={{color: '#C9082A'}}>{gots.reb_away}</h4>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h4>Rebounds</h4>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h4 style={{color: '#17408B'}}>{gots.reb_home}</h4>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h4 style={{color: '#C9082A'}}>{gots.ast_away}</h4>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h4>Assists</h4>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h4 style={{color: '#17408B'}}>{gots.ast_home}</h4>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h5 style={{color: '#C9082A'}}>{gots.fgm_away}</h5>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h5>Field Goals Made</h5>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h5 style={{color: '#17408B'}}>{gots.fgm_home}</h5>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h5 style={{color: '#C9082A'}}>{gots.ftm_away}</h5>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h5>Free Throw Made</h5>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h5 style={{color: '#17408B'}}>{gots.ftm_home}</h5>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h5 style={{color: '#C9082A'}}>{gots.fta_away}</h5>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h5>Free Throw Attempted</h5>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h5 style={{color: '#17408B'}}>{gots.fta_home}</h5>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h5 style={{color: '#C9082A'}}>{gots.pf_away}</h5>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h5>Personal Foul</h5>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h5 style={{color: '#17408B'}}>{gots.pf_home}</h5>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h5 style={{color: '#C9082A'}}>${parseInt(gots.team_salary_away).toLocaleString("en-US")}</h5>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                <h5>Salary</h5>
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h5 style={{color: '#17408B'}}>${parseInt(gots.team_salary_home).toLocaleString("en-US")}</h5>
            </Col >
        </Row>
    </CardBody>
  </Card>
  );
}

export default GameOfTheSeason;