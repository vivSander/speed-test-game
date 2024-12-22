import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  onStart: () => void;
  onStop: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  gameOver,
  onStart,
  onStop
}) => {
  if (isPlaying) {
    return (
      <button
        onClick={onStop}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Stop Game
      </button>
    );
  }

  return (
    <button
      onClick={onStart}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
    >
      {gameOver ? (
        <>
          <RotateCcw className="w-4 h-4" />
          Play Again
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          Start Game
        </>
      )}
    </button>
  );
};

export default GameControls;