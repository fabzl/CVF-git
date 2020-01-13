// src/App.js

// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Client } from 'boardgame.io/react';
import CuicosVsFlaitesBoard from './board';
import CuicosVsFlaitesGame from './game';

import { Local } from 'boardgame.io/multiplayer';

const App = Client({
	game: CuicosVsFlaitesGame,
	board: CuicosVsFlaitesBoard,
	multiplayer: Local(),
	debug: false
});

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
