import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author', () => {
  const blog = {
    author: 'Max Verstappen',
    title: 'Driving for redbull',
    url: 'https://redbull.com',
    likes: 10
  }

  render(<Blog blog={blog}/>)

  const authorElement = screen.getByText('Max Verstappen')
  const titleElement = screen.getByText('Driving for redbull')
  expect(authorElement).toBeDefined()
  expect(titleElement).toBeDefined()

  const urlElement = screen.queryByText('https://redbull.com')
  const likesElement = screen.queryByText(10)
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})