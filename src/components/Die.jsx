import { memo } from "react";

const Die = ({ value, isHeld, holdDice }) => (
  <button
    className={isHeld ? "die-face die-face__green" : "die-face rolling"}
    onClick={holdDice}
  >
    {value}
  </button>
);

export default memo(Die);
