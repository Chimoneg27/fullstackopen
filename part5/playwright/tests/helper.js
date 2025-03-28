const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)    
    await page.getByRole('button', { name: 'Post blog' }).click()
    await page.locator('.blog').filter({ hasText: title }).first().waitFor()
}

export { loginWith, createBlog }