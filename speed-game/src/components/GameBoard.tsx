import React from 'react';
import { useGame } from '../hooks/useGame';
import Cell from './Cell';
import GameControls from './GameControls';
import GameStats from './GameStats';
import { GRID_SIZE } from '../constants/game';

const GameBoard: React.FC = () => {
  const { 
    activeCell, 
    score,
    credits,
    timeUntilMove,
    gameOver, 
    isPlaying,
    handleCellHover,
    handleCellLeave,
    startGame,
    stopGame 
  } = useGame();

  return (
    <div className="flex flex-col items-center gap-6">
      <GameStats 
        score={score}
        credits={credits}
        timeUntilMove={timeUntilMove}
      />
      
      <GameControls 
        isPlaying={isPlaying}
        gameOver={gameOver}
        onStart={startGame}
        onStop={stopGame}
      />
      
      <div 
        className="grid gap-1 p-4 bg-gray-800 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <Cell
            key={index}
            isActive={index === activeCell}
            onHover={() => handleCellHover(index)}
            onLeave={handleCellLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;