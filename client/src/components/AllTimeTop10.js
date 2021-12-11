// import React from 'react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/charts';
import '../styles/AllTimeTop10.css'

const AllTimeTop10 = () => {
  const data = [
    {
      player: 'player name1',
      value: 38,
    },
    {
      player: 'player name2',
      value: 52,
    },
    {
      player: 'player name3',
      value: 61,
    },
    {
      player: 'player name4',
      value: 145,
    },
    {
      player: 'player name5',
      value: 48,
    },
    {
      player: 'player name6',
      value: 38,
    },
    {
      player: 'player name7',
      value: 52,
    },
    {
      player: 'player name8',
      value: 61,
    },
    {
      player: 'player name9',
      value: 145,
    },
    {
      player: 'player name10',
      value: 48,
    },
  ];

  const config = (data) => {
    return {
    data,
    xField: 'value',
    yField: 'player',
    seriesField: 'value',
    padding: "auto",
    legend: false,
    // color: ['red', 'navy']
    }
  };

  return (
    <div className="top10-content-chart">
      <div className="top10-pts">
        <div className="top10-pts-title">Points</div>
        <div className="top10-pts-chart">
          <Bar {...config(data)}/>
        </div>
      </div>
      <div className="top10-assists">
        <div className="top10-assists-title">Assists</div>
        <div className="top10-assists-chart">
          <Bar {...config(data)}/>
        </div>
      </div>
      <div className="top10-rebounds">
        <div className="top10-rebounds-title">Rebounds</div>
        <div className="top10-rebounds-chart">
          <Bar {...config(data)}/>
        </div>
      </div>
    </div>
  );
}

export default AllTimeTop10;