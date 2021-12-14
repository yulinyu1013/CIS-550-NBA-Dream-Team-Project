import React, { useState, useEffect } from 'react';
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

  const color1 =["#c9082a","#d58291", "#bd6b7a"]

  const color2 =["#17408b", "#274d93","#36599a", "#4666a2", "#5572a9"]

  // barchart config
  const config = (data, color) => {
    return {
      data: data,
      xField: 'value',
      yField: 'player',
      seriesField: 'value',
      padding: "auto",
      legend: false,
      color: color,
    }
  };

  return (
    <div className="top10-content-chart">
      <div className="top10-pts">
        <div className="top10-pts-title">Points</div>
        <div className="top10-pts-chart">
          <Bar {...config(pts, color2)}/>
        </div>
      </div>
      <div className="top10-assists">
        <div className="top10-assists-title">Assists</div>
        <div className="top10-assists-chart">
          <Bar {...config(ast, color1)}/>
        </div>
      </div>
      <div className="top10-rebounds">
        <div className="top10-rebounds-title">Rebounds</div>
        <div className="top10-rebounds-chart">
          <Bar {...config(reb, color2)}/>
        </div>
      </div>
    </div>
  );
}

export default AllTimeTop10;
