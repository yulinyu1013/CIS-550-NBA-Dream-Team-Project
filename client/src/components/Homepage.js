import React from 'react';
import NavBar from './Navbar';
import GameOfTheSeason from './GameOfTheSeason';
import '../styles/Homepage.css'
import AllTimeTop10 from './AllTimeTop10';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main-page">
        <div className="map-container">
          <div className="team-map-title">NBA Dream Team &#127936;</div>
          <AllTimeTop10 />
        </div>
        <div className="game-of-the-season-container">
          <div className ="gots-title">Editors' Pick: Game of the Season </div>
          <div className ="gots-video"> 
            <iframe className="pick-video"
              src='https://www.youtube.com/embed/rokGy0huYEA'
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <GameOfTheSeason />
        </div>
        <div className="top-10-container">
          <div className="top10-title">All Time Top 10 Leaders</div>
          <div className="top10-content">
            <div className="top10-pts"></div>
            <div className="top10-assists"></div>
            <div className="top10-rebounds"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;