const app = require('../server')
const supertest = require('supertest')


test("POST /api/v1/users/signup", async() => {
    const data = {
        fullname: "mamang udin",
        email: "mamang2@gmail.com",
        password: "password"
    }
    await supertest(app)
        .post('/api/v1/users/signup')
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("POST /api/v1/users/login", async() => {
    const login = {
        email: "mamang2@gmail.com",
        password: "password"
    }

    await supertest(app)
        .post('/api/v1/users/login')
        .send(login)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})