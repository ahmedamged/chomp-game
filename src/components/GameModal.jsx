import React from "react";

export const GameModal = ({
  setIsShown,
  barSize,
  setBarSize,
  setFirstPlayer,
  setSecondPlayer,
}) => {
  const handleStartBtn = () => {
    setIsShown((prev) => !prev);
  };
  return (
    <div className="modal-layout">
      <div className="modal">
        <h1 className="modal-title">Size of Chocolate Bar</h1>
        <form onSubmit={handleStartBtn}>
          <select
            value={barSize}
            onChange={(e) => setBarSize(e.target.value)}
            name="grid-size"
            className="modal-select"
          >
            <option value="four-by-five">4 * 5</option>
            <option value="five-by-sex">5 * 6</option>
            <option value="six-by-seven">6 * 7</option>
          </select>
          <div className="player-names">
            <label htmlFor="player1">First Player Name - &#40;X&#41;</label>
            <input
              type="text"
              id="player1"
              onChange={(e) => setFirstPlayer(e.target.value)}
            />
            <label htmlFor="player2">Second Player Name - &#40;O&#41;</label>
            <input
              type="text"
              id="player2"
              onChange={(e) => setSecondPlayer(e.target.value)}
            />
          </div>
          <button type="submit" className="modal-btn">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};
