const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

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
    test('user can log in', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen')).toBeVisible()
    })
  })
})