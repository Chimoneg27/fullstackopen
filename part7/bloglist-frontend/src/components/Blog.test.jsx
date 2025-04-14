import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('clicking the like button twice', async () => {
  const blog = {
    author: 'Max Verstappen',
    title: 'Driving for redbull',
    url: 'https://redbull.com',
    likes: 10
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})