import './App.css';
import Board from './board';
import Square from './square';
import { useState, useEffect } from 'react';

const defaultSquares = () => new Array(9).fill(null);
const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const[winner,setWinner]=useState((null));

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;

    const linesthatare = (a, b, c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a, b, c]) === JSON.stringify(squareValues);
      });
    };
    const emptyIndexes = squares.map((square, index) => (square === null ? index : null)).filter(val => val !== null);
    const putComputerAt =index =>{
      let newSquares=squares;
      newSquares[index]='o';
      setSquares([...newSquares]);
    }
    const playerWon = linesthatare('x', 'x', 'x').length > 0;
    if (playerWon) {
      setWinner('x');
    }
    const computerwon=linesthatare('o','o','o').length>0;
    if (computerwon){
      setWinner('o');
    }

    if (isComputerTurn) {
      const winingLines=linesthatare('o','o',null); 
      if(winingLines.length >0){
       const winindex= winingLines[0].filter(index => squares[index]===null)[0];
       putComputerAt(winindex);
      return; 
      }
      
      const linestoblock=linesthatare('x','x',null);
      if(linestoblock.length>0){
        const blockindex=linestoblock[0].filter(index => squares[index]===null)[0];
        putComputerAt(blockindex);
        return;
      }
      const linestocontinue=linesthatare('o',null,null);
      if (linestocontinue.length>0){
       putComputerAt(linestocontinue[0].filter(index => squares[index]===null)[0]);
        
        return;
      }
     
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      setSquares(prevSquares => {
        const newSquares = [...prevSquares];
        newSquares[randomIndex] = 'o';
        return newSquares;
      });
    }
  }, [squares]);

  function handleSquareClick(index) {
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      setSquares(prevSquares => {
        const newSquares = [...prevSquares];
        newSquares[index] = 'x';
        return newSquares;
      });
    }
  }

  return (
    <main>
      <Board>
        {squares.map((square, index) =>
          <Square
            x={square === 'x' ? 1 : 0}
            o={square === 'o' ? 1 : 0}
            onClick={() => handleSquareClick(index)}
          />
        )}
      </Board>
      {!! winner && winner === 'x'&&
      (<div className='result green'>
        YOU WON

      </div>)}
      
      {!! winner && winner === 'O'&&
      (<div className='result red'>
        COMPUTER WON

      </div>)}
      
    </main>
  );
}

export default App;
