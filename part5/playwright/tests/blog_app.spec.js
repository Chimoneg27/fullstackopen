const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('BlogList App is shown', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3002/api/testing/reset')
    await request.post('http://localhost:3002/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('show login form', async ({ page }) => {
    const loginForm = page.locator('form') // get the form element
    await expect(loginForm).toBeVisible()
    await expect(loginForm.locator('input[name="username"]')).toBeVisible()
    await expect(loginForm.locator('input[name="password"]')).toBeVisible()
    await expect(loginForm.locator('button[type="submit"]')).toBeVisible()   
  })

  test('login fails with wrong password', async ({page}) => {
    await loginWith(page, 'mluukai', 'garvin')
    await expect(page.getByText('Wrong username or password')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('user can log in', async ({ page }) => {
      await expect(page.getByText('Matti Luukkainen')).toBeVisible()
    })

    test('user can create a blog', async ({ page }) => {
      await createBlog(page, 'Testing Apps', 'Matti', 'https://fullstackopen')
      const blogDiv = await page.locator('.blog')
      await expect(blogDiv).toContainText('Testing Apps')
    })

    describe('blog can be liked', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'new tests', 'Matti', 'https://something.com')
      })

      test('user can like a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        const blogDiv = await page.locator('.blog')
        await expect(blogDiv).toContainText('Likes: 1')
      })
    })
  })
})

/*
Side Note

I did not write the tests from 5.21 to 5.23

I realized that I did not implement some features like the one for 5.22
*/