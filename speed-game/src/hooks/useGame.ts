import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  INITIAL_DELAY, 
  MIN_DELAY, 
  DELAY_DECREASE, 
  GRID_SIZE, 
  SCORE_INTERVAL 
} from '../constants/game';

export const useGame = () => {
  const [activeCell, setActiveCell] = useState(0);
  const [score, setScore] = useState(0);
  const [credits, setCredits] = useState(0);
  const [currentDelay, setCurrentDelay] = useState(INITIAL_DELAY);
  const [timeUntilMove, setTimeUntilMove] = useState(INITIAL_DELAY);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const moveTimer = useRef<NodeJS.Timeout>();
  const scoreTimer = useRef<NodeJS.Timeout>();
  const timeUpdateTimer = useRef<NodeJS.Timeout>();
  const lastMoveTime = useRef<number>(0);
  const nextMoveTime = useRef<number>(0);
  const isHovering = useRef(false);

  const updateTimeUntilMove = useCallback(() => {
    if (!isPlaying || gameOver) return;
    
    const now = Date.now();
    const remaining = Math.max(0, nextMoveTime.current - now);
    setTimeUntilMove(remaining);
  }, [gameOver, isPlaying]);

  const startScoring = useCallback(() => {
    if (scoreTimer.current) {
      clearInterval(scoreTimer.current);
    }
    
    scoreTimer.current = setInterval(() => {
      if (isHovering.current) {
        setScore(prev => prev + 1);
      }
    }, SCORE_INTERVAL);
  }, []);

  const moveCell = useCallback(() => {
    if (currentDelay < MIN_DELAY) {
      setGameOver(true);
      setIsPlaying(false);
      setCredits(prev => prev + Math.floor(score / 10));
      return;
    }

    if (scoreTimer.current) {
      clearInterval(scoreTimer.current);
    }
    isHovering.current = false;

    const newPosition = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    setActiveCell(newPosition);
    setCurrentDelay(prev => prev - DELAY_DECREASE);
    
    lastMoveTime.current = Date.now();
    nextMoveTime.current = lastMoveTime.current + currentDelay;

    startScoring();
    moveTimer.current = setTimeout(moveCell, currentDelay);
  }, [currentDelay, score, startScoring]);

  const handleCellHover = useCallback((index: number) => {
    if (!isPlaying || gameOver) return;
    
    if (index === activeCell) {
      isHovering.current = true;
    } else {
      isHovering.current = false;
    }
  }, [activeCell, gameOver, isPlaying]);

  const handleCellLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setCurrentDelay(INITIAL_DELAY);
    setTimeUntilMove(INITIAL_DELAY);
    setGameOver(false);
    setIsPlaying(true);
    isHovering.current = false;
    
    const now = Date.now();
    lastMoveTime.current = now;
    nextMoveTime.current = now + INITIAL_DELAY;
    
    moveTimer.current = setTimeout(moveCell, INITIAL_DELAY);
    startScoring();
  }, [moveCell, startScoring]);

  const stopGame = useCallback(() => {
    setIsPlaying(false);
    if (moveTimer.current) clearTimeout(moveTimer.current);
    if (scoreTimer.current) clearInterval(scoreTimer.current);
    if (timeUpdateTimer.current) clearInterval(timeUpdateTimer.current);
  }, []);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      timeUpdateTimer.current = setInterval(updateTimeUntilMove, 50); // Update more frequently for smoother countdown
    }
    return () => {
      if (timeUpdateTimer.current) clearInterval(timeUpdateTimer.current);
    };
  }, [isPlaying, gameOver, updateTimeUntilMove]);

  useEffect(() => {
    return () => {
      if (moveTimer.current) clearTimeout(moveTimer.current);
      if (scoreTimer.current) clearInterval(scoreTimer.current);
      if (timeUpdateTimer.current) clearInterval(timeUpdateTimer.current);
    };
  }, []);

  return {
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
  };
};