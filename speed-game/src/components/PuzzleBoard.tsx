import React from 'react';
import { usePuzzle } from '../hooks/usePuzzle';
import PuzzlePiece from './PuzzlePiece';

interface PuzzleBoardProps {
  size: number;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ size }) => {
  const { pieces, movePiece, checkPosition } = usePuzzle(size);

  return (
    <div 
      className="grid gap-1 p-4 bg-gray-800 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        width: 'min(90vw, 90vh)',
        height: 'min(90vw, 90vh)',
      }}
    >
      {pieces.map((piece, index) => (
        <PuzzlePiece
          key={piece.id}
          {...piece}
          onDragEnd={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            checkPosition(index, x, y);
          }}
          onDrag={(e) => movePiece(index, e.clientX, e.clientY)}
        />
      ))}
    </div>
  );
};

export default PuzzleBoard;