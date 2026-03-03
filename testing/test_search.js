import puppeteer from 'puppeteer'

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Capture page console logs
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))
  page.on('pageerror', (error) => console.log('PAGE ERROR:', error.message))
  page.on('requestfailed', (request) =>
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText),
  )

  console.log('Navigating to local dev server...')
  await page.goto('http://localhost:5173/')

  // Wait for the form to appear
  console.log('Waiting for search form...')
  await page.waitForSelector('form[role="search"] input[type="search"]')

  // Type in the search box
  console.log("Typing 'Smart'...")
  await page.type('form[role="search"] input[type="search"]', 'Smart')

  // Click submit
  console.log('Clicking submit...')
  await page.click('form[role="search"] button[type="submit"]')

  // Wait a bit to see if route changes or an error happens
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('Current URL:', page.url())

  await browser.close()
})()
