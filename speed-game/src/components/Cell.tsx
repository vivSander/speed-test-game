import React from 'react';

interface CellProps {
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const Cell: React.FC<CellProps> = ({ isActive, onHover, onLeave }) => {
  return (
    <div
      className={`w-full h-full rounded-md transition-colors duration-200 ${
        isActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  );
};

export default Cell;