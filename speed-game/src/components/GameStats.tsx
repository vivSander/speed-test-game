import React from 'react';
import { Coins, Clock } from 'lucide-react';

interface GameStatsProps {
  score: number;
  credits: number;
  timeUntilMove: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, credits, timeUntilMove }) => {
  return (
    <div className="flex gap-6 items-center bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="text-xl">Score: {score}</div>
      </div>
      <div className="flex items-center gap-2">
        <Coins className="w-4 h-4 text-yellow-400" />
        <div className="text-xl text-yellow-400">Credits: {credits}</div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400" />
        <div className="text-xl text-blue-400">{(timeUntilMove / 1000).toFixed(1)}s</div>
      </div>
    </div>
  );
};

export default GameStats;