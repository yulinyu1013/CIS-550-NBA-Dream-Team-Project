// import React from 'react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/charts';
import '../styles/AllTimeTop10.css'
import { getAllTimeTop10 } from './fetchers';

const AllTimeTop10 = () => {
  const [pts,setPts] = useState([]);
  const [ast,setAst] = useState([]);
  const [reb,setReb] = useState([]);
  

  useEffect(() => {
    getAllTimeTop10().then((res)=>{
      console.log(res.data.filter(a => a.category==="pts"));
        setPts(res.data.filter(a => a.category==="pts"));
        setAst(res.data.filter(a => a.category==="ast"));
        setReb(res.data.filter(a => a.category==="reb"));
    })
  },[])

  const config = (data) => {
    return {
    data: data,
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
          <Bar {...config(pts)}/>
        </div>
      </div>
      <div className="top10-assists">
        <div className="top10-assists-title">Assists</div>
        <div className="top10-assists-chart">
          <Bar {...config(ast)}/>
        </div>
      </div>
      <div className="top10-rebounds">
        <div className="top10-rebounds-title">Rebounds</div>
        <div className="top10-rebounds-chart">
          <Bar {...config(reb)}/>
        </div>
      </div>
    </div>
  );
}

export default AllTimeTop10;
