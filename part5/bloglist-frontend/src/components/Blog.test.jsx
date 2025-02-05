import { fireEvent, render, screen } from '@testing-library/react'
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

test('toggles visibility of blog details', () => {
  const blog = {
    author: 'Max Verstappen',
    title: 'Driving for redbull',
    url: 'https://redbull.com',
    likes: 10
  }
    
  render(<Blog blog={blog} />)

  expect(screen.queryByText('https://redbull.com')).toBeNull()
  expect(screen.queryByText(/10/i)).toBeNull()

  const viewButton = screen.getByText('view')
  fireEvent.click(viewButton)

  expect(screen.queryByText('https://redbull.com')).toBeInTheDocument()
  expect(screen.queryByText(/10/i)).toBeInTheDocument()
})