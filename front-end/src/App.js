import './App.css';
import React from 'react';
import Landing from './pages/Landing'
import Planete from './pages/Planete'
import Astronauts from './pages/Astronauts';
import Stats from './pages/Stats';

function App() {
  
  return (
    <>
      <Landing />
      <Planete />
      <Astronauts />
      <Stats />
    </>
  );
}

export default App;
