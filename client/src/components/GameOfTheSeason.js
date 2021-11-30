import React from 'react';
import { Card, CardBody, CardTitle } from 'shards-react';
import {
  Row,
  Col,
} from 'antd'
import 'antd/dist/antd.css';

const GameOfTheSeason = () => {
  return (
  <Card>
      <CardBody>
          <Row gutter='30' align='middle' justify='center'>
              <Col flex={2} style={{ textAlign: 'left' }}>
                  <CardTitle>Home(logo)</CardTitle>

              </Col>
              <Col flex={2} style={{ textAlign: 'center' }}>
                  Date at Time
              </Col>
              <Col flex={2} style={{ textAlign: 'right' }}>
                  <CardTitle>Away(logo)</CardTitle>

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
                  assists
              </Col >
              <Col span={9} style={{ textAlign: 'right' }}>
                  <h6>assist_away</h6>
              </Col >
          </Row>
      </CardBody>
    </Card>
  );
}

export default GameOfTheSeason;