import { useEffect, useState } from 'react'
import { Button } from './Button'

export const Modal = ({ numOfRolls, newGame }) => {
  const [lowestNumRolls, setLowestNumRolls] = useState(() =>
    JSON.parse(localStorage.getItem('lowestNumRolls') || 0)
  )
  const [highestNumRolls, setHighestNumRolls] = useState(() =>
    JSON.parse(localStorage.getItem('highestNumRolls') || 1)
  )

  useEffect(() => {
    console.log('Set Highest')

    if (
      numOfRolls !== 0 &&
      (numOfRolls < lowestNumRolls || lowestNumRolls === 0)
    ) {
      localStorage.setItem('lowestNumRolls', numOfRolls)
      setLowestNumRolls(numOfRolls)
    }

    if (numOfRolls !== 0 && numOfRolls > highestNumRolls) {
      localStorage.setItem('highestNumRolls', numOfRolls)
      setHighestNumRolls(numOfRolls)
    }
  }, [numOfRolls])

  console.log('Rendering STATS')

  return (
    <>
      <h2 className="heading">🥳 Congratulations, You Won 🥳</h2>
      <h3 className="message">Game Stats</h3>
      <section className="stats">
        <p className="stats-text">
          Number of rolls: <strong>{numOfRolls}</strong>
        </p>
        <p className="stats-text">
          Lowest number of rolls: <strong>{lowestNumRolls}</strong>
        </p>
        <p className="stats-text">
          Highest number of rolls: <strong>{highestNumRolls}</strong>
        </p>
      </section>
      <Button className="new-game" handleClick={newGame}>
        New Game
      </Button>
    </>
  )
}
