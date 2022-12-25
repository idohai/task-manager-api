const {userOneId, userOne, setupDatabase} = require('./fixtures/db')
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

beforeEach(setupDatabase)

// afterAll(() => {
//     mongoose.connection.close()
// })

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name:'Ido',
        email:'ido@example.com',
        password:'MyPass777!'
    }).expect(201)

    //Some assertion about the response + database integrity
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'Ido',
            email: 'ido@example.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test("Shouldn't login on bad credentials", async () => {
    await request(app).post('/users/login').send({
        email: userOne.email + "haha",
        password: userOne.password
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Shouldn't get profile for unauthenticated user", async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Shouldn't delete account for unauthenticated user", async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    //check if the image is saved as buffer
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Hagar😇'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Hagar😇')
})

test('Should not update unauthorized user', async () => {
    const response = await request(app)
    .patch('/users/me')
    .send({
        name: 'Hagar😇'
    })
    .expect(401)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Hagar')
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Ramat Hasharon'
    })
    .expect(400)
})