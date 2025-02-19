const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('BlogList App is shown', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('show login form', async ({ page }) => {
    const loginForm = page.locator('form') // get the form element
    await expect(loginForm).toBeVisible()
    await expect(loginForm.locator('input[name="username"]')).toBeVisible()
    await expect(loginForm.locator('input[name="password"]')).toBeVisible()
    await expect(loginForm.locator('button[type="submit"]')).toBeVisible()   
  })
})