import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> for when a user creates a new blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputURL = screen.getByPlaceholderText('URL')
  const postButton = screen.getByText('Post blog')

  await user.type(inputTitle, 'testing the blog form')
  await user.type(inputAuthor, 'Mike')
  await user.type(inputURL, 'https://lastbreath.com')

  await user.click(postButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing the blog form',
    author: 'Mike',
    url: 'https://lastbreath.com'
  })
})