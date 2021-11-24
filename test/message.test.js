const app = require('../server')
const supertest = require('supertest')

test('POST /api/v1/messages/send/:sendId', async() => {
    const login = {
        email: "mamang4@gmail.com",
        password: "password"
    }
    const data = {
        reply: "hii there"
    }
    const create = await supertest(app).post('/api/v1/users/login').send(login)
    await supertest(app)
        .post('/api/v1/messages/send/2')
        .set("Authorization", "Bearer " + create.body.data)
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("GET /api/v1/messages/all", async() => {
    const login = {
        email: "mamang4@gmail.com",
        password: "password"
    }
    const create = await supertest(app).post('/api/v1/users/login').send(login)
    await supertest(app)
        .get('/api/v1/messages/all')
        .set("Authorization", "Bearer " + create.body.data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("GET /api/v1/messages/user/:partner", async() => {
    const login = {
        email: "mamang4@gmail.com",
        password: "password"
    }
    const create = await supertest(app).post('/api/v1/users/login').send(login)
    await supertest(app)
        .get('/api/v1/messages/user/2')
        .set("Authorization", "Bearer " + create.body.data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})