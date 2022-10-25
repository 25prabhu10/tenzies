import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Button } from '../components/Button'

describe('Button component', () => {
  test('loads', () => {
    // ARRANGE
    render(<Button />)

    // ASSERT
    expect(screen.getByRole('button')).toBeEmptyDOMElement()
  })

  test('loads and displays text', () => {
    // ARRANGE
    render(<Button>Click Me</Button>)

    // ASSERT
    expect(screen.getByRole('button')).toHaveTextContent(/click me/i)
  })

  test('loads and on click calls the function', async () => {
    // ARRANGE
    const handleClick = vi.fn()
    render(<Button handleClick={handleClick} />)

    const btn = screen.getByRole('button')

    // ACT
    await userEvent.click(btn)

    // ASSERT
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
