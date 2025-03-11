import React, { useEffect, useRef, useState } from 'react';
import './Games.css';

const gridSize = 20;
const canvasWidth = 400;
const canvasHeight = 400;

const Snake = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const snakeRef = useRef([{ x: gridSize * 5, y: gridSize * 5 }]);
  const directionRef = useRef({ x: 0, y: 0 });
  const foodRef = useRef({ x: gridSize * 10, y: gridSize * 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    snakeRef.current = [{ x: gridSize * 5, y: gridSize * 5 }];
    directionRef.current = { x: 0, y: 0 };
    foodRef.current = { x: gridSize * 10, y: gridSize * 10 };
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const generateFood = () => {
      
      const x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
      
      
      const snake = snakeRef.current;
      const foodOnSnake = snake.some(segment => segment.x === x && segment.y === y);
      
      if (foodOnSnake) {
        return generateFood();
      }
      
      return { x, y };
    };

    const update = () => {
      if (gameOver) return;

      const snake = snakeRef.current;
      const direction = directionRef.current;
      const food = foodRef.current;

      
      if (direction.x === 0 && direction.y === 0) return;

      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      
     
      if (
        head.x < 0 || 
        head.y < 0 || 
        head.x >= canvasWidth || 
        head.y >= canvasHeight
      ) {
        setGameOver(true);
        return;
      }
      
      
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          setGameOver(true);
          return;
        }
      }

     
      const newSnake = [head, ...snake];

      
      if (head.x === food.x && head.y === food.y) {
        foodRef.current = generateFood();
        setScore(prevScore => prevScore + 1);
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      
      const snake = snakeRef.current;
      ctx.fillStyle = 'lime';
      snake.forEach((segment, index) => {
       
        if (index === 0) {
          ctx.fillStyle = '#00cc00';
        } else {
          ctx.fillStyle = 'lime';
        }
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      });

      // Draw food
      const food = foodRef.current;
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, gridSize, gridSize);

      
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 25);

      
      if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Space to Restart', canvasWidth / 2, canvasHeight / 2 + 30);
      }
    };

    const gameLoop = () => {
      update();
      draw();
      gameLoopRef.current = setTimeout(gameLoop, 150);
    };

    const handleKeyDown = (event) => {
      
      if (event.code === 'Space' && gameOver) {
        resetGame();
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          if (directionRef.current.y === 0) {
            directionRef.current = { x: 0, y: -gridSize };
          }
          break;
        case 'ArrowDown':
          if (directionRef.current.y === 0) {
            directionRef.current = { x: 0, y: gridSize };
          }
          break;
        case 'ArrowLeft':
          if (directionRef.current.x === 0) {
            directionRef.current = { x: -gridSize, y: 0 };
          }
          break;
        case 'ArrowRight':
          if (directionRef.current.x === 0) {
            directionRef.current = { x: gridSize, y: 0 };
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    gameLoopRef.current = setTimeout(gameLoop, 150);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(gameLoopRef.current);
    };
  }, [gameOver, score]);

  return (
    <div className="game-container">
      <canvas 
        ref={canvasRef} 
        width={canvasWidth} 
        height={canvasHeight} 
        className="game-canvas"
      />
    </div>
  );
};

export default Snake;