import { useState, useCallback } from 'react';
import { generateColors } from '../utils/colors';

interface PuzzlePiece {
  id: string;
  color: string;
  x: number;
  y: number;
  isFixed: boolean;
}

export const usePuzzle = (size: number) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(() => {
    const colors = generateColors(size * size);
    return colors.map((color, index) => ({
      id: `piece-${index}`,
      color,
      x: 0,
      y: 0,
      isFixed: false,
    }));
  });

  const movePiece = useCallback((index: number, x: number, y: number) => {
    setPieces(prev => {
      const newPieces = [...prev];
      if (!newPieces[index].isFixed) {
        newPieces[index] = { ...newPieces[index], x, y };
      }
      return newPieces;
    });
  }, []);

  const checkPosition = useCallback((index: number, x: number, y: number) => {
    setPieces(prev => {
      const newPieces = [...prev];
      const targetX = (index % size) * (100 / size);
      const targetY = Math.floor(index / size) * (100 / size);
      
      const tolerance = 20; // pixels
      if (
        Math.abs(x - targetX) < tolerance &&
        Math.abs(y - targetY) < tolerance
      ) {
        newPieces[index] = {
          ...newPieces[index],
          isFixed: true,
          x: targetX,
          y: targetY,
        };
      }
      return newPieces;
    });
  }, [size]);

  return { pieces, movePiece, checkPosition };
};