import { faker } from '@faker-js/faker';
import { test, expect } from "@playwright/test";
import userData from "../../data/UserData.json"

const loginuser = userData.user1

function getRandomUser() {
    const users = Object.values(userData)
    const randomIndex = Math.floor(Math.random() * users.length)
    return users[randomIndex]
}

test('Create new user', async ({ request }) => {
    const createResponse = await request.post(`/auth/register`, {
        data: {
            userName: faker.internet.username(),
            email: faker.internet.email(),
            password: 'Password123',
            phone: faker.phone.number({ style: 'international' }),
            address: faker.location.city()
        }
    })
    
    expect(createResponse.status()).toBe(201)
    const responseBody = await createResponse.json()

    // const _id = responseBody._id

    // const deleteResponse = await request.delete(`/admin/users/${_id}`)
    // expect(deleteResponse.status()).toBe(204)
})

test('Login User', async ({ request }) => {
    const randomUser = getRandomUser()

    const LoginResponse = await request.post(`/auth/login`, {
        data: {
            email: randomUser.email,
            password: randomUser.password
        }
    })
    expect(LoginResponse.status()).toBe(200)
    console.log(`Logged in as: ${randomUser.email}`)
})

test('Check Auth', async({ request }) =>{
    const AuthResponse = await request.get(`/auth/check-auth`)

    expect (AuthResponse.status()).toBe(200)
})