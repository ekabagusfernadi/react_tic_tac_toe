import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// eslint-disable-next-line react/prop-types
function Square({ value, onSquareClick }) {

  return (
    <>
      <button className="square" onClick={onSquareClick}>{value}</button>
    </>
  )
}

function calculateWinner(squares) {
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
    const [a, b ,c] = lines[i];

    if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      return squares[a];
    }
  }

  return false;
}

// eslint-disable-next-line react/prop-types
function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {

    // cek sudah ada isi atau belum
    if( squares[i] || calculateWinner(squares) ) return ;

    // eslint-disable-next-line react/prop-types
    const nextSquares = squares.slice();  // semua array dicopy

    nextSquares[i] = xIsNext ? "X" : "O"; // array dengan index diganti ["X", null, "O", dst]
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = "";
  if( winner ) {
    status = "Winners: " + winner;
  } else {
    status = "Next players: " + ( xIsNext ? "X" : "O" );
  }

  return (
    <>
      <div className='status'>
        {status}
      </div>
      <div className="board">
        {
          // eslint-disable-next-line react/prop-types
          squares.map(( element, index ) => (
            <Square key={index} value={element} onSquareClick={() => handleClick(index)}/>  // ketika kirim parameter function() maka otomatis function dijalankan karena ada (), jadi bungkus dulu dengan anonymous function =>
          ))
        }
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);  // semua history array
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove]; // keadaan terakhir dari array
  const xIsNext = currentMove % 2 === 0;

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if( move > 0 ) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </>
    );
  });

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game
