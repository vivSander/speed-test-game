import React from 'react';

interface PuzzlePieceProps {
  color: string;
  x: number;
  y: number;
  isFixed: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  color,
  isFixed,
  onDrag,
  onDragEnd,
}) => {
  return (
    <div
      draggable={!isFixed}
      className={`w-full h-full rounded-md transition-transform ${
        isFixed ? 'cursor-default' : 'cursor-move hover:scale-105'
      }`}
      style={{ backgroundColor: color }}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    />
  );
};

export default PuzzlePiece;