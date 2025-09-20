import React from "react";

export const GameModal = ({ setIsShown, barSize, setBarSize }) => {
  const handleStartBtn = () => {
    setIsShown((prev) => !prev);
  };
  return (
    <div className="modal-layout">
      <div className="modal">
        <h1 className="modal-title">Size of Chocolate Bar</h1>
        <form>
          <select
            value={barSize}
            onChange={(e) => setBarSize(e.target.value)}
            name="grid-size"
            className="modal-select"
          >
            <option value="four-by-five">4 * 5</option>
            <option value="five-by-sex">5 * 6</option>
            <option value="six-by-seven">6 * 7</option>
            <option value="seven-by-eight">7 * 8</option>
          </select>
        </form>
        <button onClick={handleStartBtn} className="modal-btn">
          Start Game
        </button>
      </div>
    </div>
  );
};
