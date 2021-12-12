import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'shards-react';
import {
  Row,
  Col,
} from 'antd'
import 'antd/dist/antd.css';
import { getGameOfTheSeason } from './fetchers';

const GameOfTheSeason = () => {

    const [gots,setGots] = useState({});

    useEffect(() => {
        getGameOfTheSeason().then((res)=>{
            setGots(res.data);
        })
    },[])

  return (
    <Card>
    <CardBody>
        <Row gutter='30' align='middle' justify='center'>
            <Col flex={2} style={{ textAlign: 'left' }}>
              <CardTitle>Home(logo)</CardTitle>
            </Col>
            <Col flex={2} style={{ textAlign: 'center' }}>
                2020-12-22
            </Col>
            <Col flex={2} style={{ textAlign: 'right' }}>
                <CardTitle>Away(logo)</CardTitle>
            </Col>
        </Row>
        <Row gutter='30' align='middle' justify='center'>
          <Col flex={2} style={{ textAlign: 'left' }}>
              <CardTitle>{gots.team_name_home}</CardTitle>
            </Col>
            <Col flex={2} style={{ textAlign: 'center' }}>
             VS
            </Col>
            <Col flex={2} style={{ textAlign: 'right' }}>
              <CardTitle>{gots.team_name_away}</CardTitle>
            </Col>
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.pts_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Points
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.pts_away}</h6>
            </Col >
  
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.reb_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Rebounds
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.reb_away}</h6>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.ast_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Assists
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.ast_away}</h6>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.fgm_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Field Goals Made
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.fgm_away}</h6>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.ftm_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Free Throw Made
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.ftm_away}</h6>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.fta_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Free Throw Attempted
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.fta_away}</h6>
            </Col >
        </Row>
        <Row gutter='30' align='middle' justify='center'>
            <Col span={9} style={{ textAlign: 'left' }}>
                <h6>{gots.pf_home}</h6>
            </Col >
            <Col span={6} style={{ textAlign: 'center' }}>
                Personal Foul
            </Col >
            <Col span={9} style={{ textAlign: 'right' }}>
                <h6>{gots.pf_away}</h6>
            </Col >
        </Row>
    </CardBody>
  </Card>
  );
}

export default GameOfTheSeason;