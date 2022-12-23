//CRUD - CREATE READ UPDATE DELETE
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId} = require('mongodb')
const connectionURL = 'mongodb+srv://ido:pl11plpl@cluster0.z9n8o1n.mongodb.net/?retryWrites=true&w=majority'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(error)
    }

    const db = client.db(databaseName)

    //CREATE
    // db.collection('users').insertOne({
    //     name: 'IdoHai',
    //     age: 30,
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age:26
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "task1",
    //         completed: false,
    //     }, {
    //         description: "task2",
    //         completed: false,
    //     }, {
    //         description: "task3",
    //         completed: false,
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    //READ:
    // db.collection('users').findOne( { _id: new ObjectID("63908900e84dd93b48ab8404") }, (error, user) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('tasks').find( {completed: false}).toArray( (error, tasks) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(tasks)
    // })

    // UPDATE
    // db.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').updateOne({ _id: new ObjectId("639087453c6ff3835812a1c4") },
    // {
    //     $inc: {
    //         age: 1
    //     }
    // }).then( (result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // DELETE
    // db.collection('users').deleteOne({name: 'Hi'}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // db.collection('users').deleteMany({name: 'Ido'}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //  db.collection('tasks').deleteOne({description: 'task3'})
    //     .then((result) => console.log(result)
    //     ).catch((error) => console.log(error))
})