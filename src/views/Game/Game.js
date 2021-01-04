import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';
import './Game.scss';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const calculateWinner = (squares) => {
    console.log('calculateWinner current step =' + JSON.stringify(squares));
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleClick = (i) => {
    const his = history.slice(0, stepNumber + 1);
    const currentStep = his[his.length - 1];
    const squares = currentStep.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = isNext ? 'X' : 'O';
    setHistory(
      history.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(his.length);
    setIsNext(!isNext);
  };

  const status = () => {
    const winner = calculateWinner(history[stepNumber].squares);
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + (isNext ? 'X' : 'O');
    }
  };

  const moves = history.map((step, move) => {
    const jumpTo = (step) => {
      setStepNumber(step);
      setIsNext(step % 2 === 0);
    };
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  useEffect(() => {
    console.log('useEffect history=' + history.length);
    console.log('useEffect stepNumber=' + stepNumber);
    console.log('useEffect isNext=' + isNext);
    const currentStep = history[history.length - 1];
    const squares = currentStep.squares.slice();
    console.log('useEffect current step =' + JSON.stringify(squares));
  }, [history, stepNumber, isNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status()}</div>
        {/* <ol>{moves()}</ol> */}
      </div>
    </div>
  );
};

export default Game;
