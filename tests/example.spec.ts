import { test, expect, defineConfig } from "@playwright/test";
//import test from "node:test";

test('GET all products', async ({ request }) => {
  const response = await request.get(`/shop/products/get`)

  expect(response.status()).toBe(200)

  const responseBody = await response.json()
  expect(responseBody).toHaveProperty('data')
  expect(Array.isArray(responseBody.data)).toBeTruthy()
})