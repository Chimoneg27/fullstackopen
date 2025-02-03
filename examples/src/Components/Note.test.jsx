import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { expect } from 'vitest'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button calls the event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  //mock functiion defined with vitest
  const mockhandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockhandler}/>
  )
  // a session is started to interact with the rendered component
  const user = userEvent.setup()

  const button = screen.getByText('make not important')
  await user.click(button) // clicking happens with the method click of the userEvent-library

  expect(mockhandler.mock.calls).toHaveLength() // toHaveLength verifies that the mock function has been called exactly once
})