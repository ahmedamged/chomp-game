import { useEffect, useState } from "react";
import "./App.css";
import { GameModal } from "./components/GameModal";

let xOCount = 0;
function App() {
  const [modalIsShown, setModalIsShown] = useState(true);
  const [barSize, setBarSize] = useState("four-by-five");
  const [chocolateBar, setChocolateBar] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [loser, setLoser] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");

  const createDynamicMatrix = (rows, cols, initialValue = 0) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = initialValue;
      }
    }
    return matrix;
  };

  const checkLoser = (loser) => {
    let totalCells = 0;
    if (barSize === "four-by-five") {
      totalCells = 20;
    } else if (barSize === "five-by-sex") {
      totalCells = 30;
    } else if (barSize === "six-by-seven") {
      totalCells = 42;
    }

    if (xOCount === totalCells - 1) {
      setLoser(loser);
      if (loser === "X") {
        setOScore((prevOScore) => prevOScore + 1);
      } else if (loser === "O") {
        setXScore((prevXScore) => prevXScore + 1);
      }
    }
  };
  const handleCellClick = (rowIndex, cellIndex) => {
    if (rowIndex === 0 && cellIndex === 0) {
      if (isPlayerX) {
        setLoser("X");
      } else {
        setLoser("O");
      }
    }
    if (isPlayerX) {
      const newChocolateBar = [...chocolateBar];
      if (newChocolateBar[rowIndex][cellIndex] === null) {
        for (let i = 0; i < newChocolateBar.length; i++) {
          for (let j = 0; j < newChocolateBar[i].length; j++) {
            if (
              i >= rowIndex &&
              j >= cellIndex &&
              newChocolateBar[i][j] === null
            ) {
              newChocolateBar[i][j] = "X";
              xOCount += 1;
            }
          }
        }
        setChocolateBar(newChocolateBar);
        setIsPlayerX((prev) => !prev);
        checkLoser("O");
      }
    } else {
      const newChocolateBar = [...chocolateBar];
      if (newChocolateBar[rowIndex][cellIndex] === null) {
        for (let i = 0; i < newChocolateBar.length; i++) {
          for (let j = 0; j < newChocolateBar[i].length; j++) {
            if (
              i >= rowIndex &&
              j >= cellIndex &&
              newChocolateBar[i][j] === null
            ) {
              newChocolateBar[i][j] = "O";
              xOCount += 1;
            }
          }
        }
        setChocolateBar(newChocolateBar);
        setIsPlayerX((prev) => !prev);
        checkLoser("X");
      }
    }
  };

  const resetGame = () => {
    let chocolateBarMatrix;
    if (barSize === "four-by-five") {
      chocolateBarMatrix = createDynamicMatrix(4, 5, null);
      setChocolateBar(chocolateBarMatrix);
    } else if (barSize === "five-by-sex") {
      chocolateBarMatrix = createDynamicMatrix(5, 6, null);
      setChocolateBar(chocolateBarMatrix);
    } else if (barSize === "six-by-seven") {
      chocolateBarMatrix = createDynamicMatrix(6, 7, null);
      setChocolateBar(chocolateBarMatrix);
    }
    setIsPlayerX(true);
    setLoser(null);
    xOCount = 0;
  };

  useEffect(() => {
    let chocolateBarMatrix;
    if (barSize === "four-by-five") {
      chocolateBarMatrix = createDynamicMatrix(4, 5, null);
      setChocolateBar(chocolateBarMatrix);
    } else if (barSize === "five-by-sex") {
      chocolateBarMatrix = createDynamicMatrix(5, 6, null);
      setChocolateBar(chocolateBarMatrix);
    } else if (barSize === "six-by-seven") {
      chocolateBarMatrix = createDynamicMatrix(6, 7, null);
      setChocolateBar(chocolateBarMatrix);
    }
  }, [barSize]);
  return (
    <>
      <div>
        {modalIsShown ? (
          <GameModal
            setIsShown={setModalIsShown}
            barSize={barSize}
            setBarSize={setBarSize}
            setFirstPlayer={setFirstPlayer}
            setSecondPlayer={setSecondPlayer}
          />
        ) : null}
      </div>
      <div className="text-emerald-50">
        {loser ? (
          <p className="text-2xl animate-bounce duration-200 mb-4 mt-20">
            Loser is {loser}
          </p>
        ) : (
          <p className="text-2xl mb-4 mt-20">Avoid eating the top left bite</p>
        )}
        <p className="text-lg absolute top-[10px] left-[50%] translate-x-[-50%]">
          {firstPlayer}
          <span className="text-purple-300"> &#40;X&#41;</span> is {xScore}
          <hr />
          {secondPlayer}
          <span className="text-cyan-400"> &#40;O&#41;</span> is {oScore}
        </p>
      </div>
      <div className="w-full px-0 sm:px-32">
        {chocolateBar.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                className={`size-16 ${
                  rowIndex === 0
                    ? cellIndex === 0
                      ? "bg-gray-500"
                      : "bg-gray-800"
                    : "bg-gray-800"
                } ${cell === "X" ? "text-purple-300 bg-purple-800!" : ""}${
                  cell === "O" ? "text-cyan-400 bg-cyan-800!" : ""
                } ounded-md text-5xl font-light cursor-pointer transition-colors duration-200 m-1 hover:bg-gray-700`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="text-white px-24 py-4 m-4 border cursor-pointer hover:bg-gray-700"
      >
        Reset Game
      </button>
    </>
  );
}

export default App;
