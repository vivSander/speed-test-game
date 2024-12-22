import React from 'react';
import GameBoard from './components/GameBoard';
import { Zap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Reaction Game</h1>
        <Zap className="w-6 h-6 text-yellow-400" />
      </div>
      
      <p className="text-gray-400 text-center max-w-md">
        Stay on the blue cell to score points! The cell will move faster as time progresses.
        How many points can you score before it becomes too fast?
      </p>

      <GameBoard />
    </div>
  );
}

export default App;