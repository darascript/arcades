import React, { useState } from 'react';
import './App.css';
import Snake from './games/Snake';


const gamesList = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Classic Snake game. Eat food, grow longer, avoid walls and yourself!',
    image: './assets/snake.png', 
    component: Snake
  },
  {
    id: 'game 2',
    name: 'game 2',
    description: ' Coming soon!',
    image: '', 
    component: null
  },
  {
    id: 'game 3',
    name: 'game 3',
    description: 'Coming soon!',
    image: '', 
    component: null 
  }
];

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (gameId) => {
    const game = gamesList.find(game => game.id === gameId);
    if (game && game.component) {
      setSelectedGame(game);
    }
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
  };

  
  if (selectedGame && selectedGame.component) {
    const GameComponent = selectedGame.component;
    return (
      <div className="game-container">
        <button className="back-button" onClick={handleBackToMenu}>
          ← Back to Menu
        </button>
        <h1>{selectedGame.name}</h1>
        <GameComponent />
      </div>
    );
  }

  
  return (
    <div className="games-menu">
      <h1>Choose Your Game</h1>
      <div className="games-grid">
        {gamesList.map(game => (
          <div 
            key={game.id} 
            className={`game-card ${!game.component ? 'disabled' : ''}`}
            onClick={() => game.component && handleGameSelect(game.id)}
          >
            <div className="game-image">
              <img src={game.image} alt={game.name} />
              {!game.component && <div className="coming-soon-overlay">Coming Soon</div>}
            </div>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;