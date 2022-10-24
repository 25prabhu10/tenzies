import { memo } from 'react'

const Die = ({ value, isHeld, handleClick, ...rest }) => (
  <button
    className={isHeld ? 'die-face die-face__green' : 'die-face rolling'}
    onClick={handleClick}
    {...rest}>
    {value}
  </button>
)

export default memo(Die)
