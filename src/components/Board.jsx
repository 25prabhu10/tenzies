import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from 'react'
import { Button } from './Button'
import Die from './Die'
import { Modal } from './Modal'

const generateNewDie = () => ({
  id: nanoid(),
  value: Math.ceil(Math.random() * 6),
  isHeld: false,
})

const allNewDice = () => {
  const newDice = []

  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie())
  }

  return newDice
}

function Board() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)

  useEffect(() => {
    const firstValue = dice.length && dice[0]?.value

    const allDiceHeld = dice.every(
      (die) => die.isHeld && firstValue === die.value
    )

    setTenzies(allDiceHeld)
  }, [dice])

  const rollDice = () => {
    setNumOfRolls((prev) => prev + 1)

    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
    )
  }

  const handleClick = useCallback((event) => {
    const holdDice = (id) => {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        )
      )
    }

    holdDice(event.target.id)
  }, [])

  const newGame = () => {
    setDice(allNewDice())
    setNumOfRolls(0)
  }

  return (
    <>
      {!tenzies && (
        <>
          <h1 className="title">Tenzies</h1>
          <p className="description">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <section className="dice-container">
            {dice &&
              dice.map((die) => (
                <Die
                  key={die.id}
                  id={die.id}
                  value={die.value}
                  isHeld={die.isHeld}
                  handleClick={handleClick}></Die>
              ))}
          </section>

          <Button
            className={tenzies ? 'new-game' : 'roll-dice'}
            handleClick={rollDice}>
            Roll
          </Button>
        </>
      )}

      {tenzies && <Modal numOfRolls={numOfRolls} newGame={newGame} />}
    </>
  )
}

export default Board
