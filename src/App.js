// src/App.js
import React, { useState, useEffect } from 'react';
// App.js
import './App.css'; // Or './styles.css'
// index.js
import './index.css';


const emojis = ['😀', '😂', '😍', '😎', '🤯', '😱', '👻', '🎃'];

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(null);
  const [gameGrid, setGameGrid] = useState(Array(9).fill(null));

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setRandomEmoji();
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setActiveEmoji(null);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameGrid(Array(9).fill(null));
    setActiveEmoji(null);
  };

  const setRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newGrid = Array(9).fill(null);
    newGrid[randomIndex] = randomEmoji;
    setActiveEmoji(randomIndex);
    setGameGrid(newGrid);
  };

  const handleEmojiClick = (index) => {
    if (isPlaying && index === activeEmoji) {
      setScore((prevScore) => prevScore + 1);
      setGameGrid(Array(9).fill(null));
      setActiveEmoji(null);
    }
  };

  return (
    <div className="app">
      <h1>Whack-an-Emoji</h1>
      <div className="scoreboard">
        <p>Score: <strong>{score}</strong></p>
        <p>Time Left: <strong>{timeLeft}</strong> seconds</p>
      </div>
      {!isPlaying && (
        <button className="start-btn" onClick={startGame}>Start Game</button>
      )}
      <div className="game-grid">
        {gameGrid.map((emoji, index) => (
          <div
            key={index}
            className={`grid-item ${emoji ? 'active' : ''}`}
            onClick={() => handleEmojiClick(index)}
          >
            {emoji}
          </div>
        ))}
      </div>
      {!isPlaying && timeLeft === 0 && (
        <p className="game-over">Game Over! Your score: {score}</p>
      )}
    </div>
  );
}

export default App;
