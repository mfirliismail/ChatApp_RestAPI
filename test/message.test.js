const app = require('../server')
const supertest = require('supertest')

test('POST /api/v1/messages/send/:sendId', async() => {
    const login = {
        email: "mamang3@gmail.com",
        password: "password"
    }
    const create = await supertest(app).post('/api/v1/messages/send/1', async() => {

    })
})