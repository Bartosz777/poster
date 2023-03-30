require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()


const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

app.use(express.json())

app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)




mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to db & Server is running on port ' + process.env.PORT)
    })
})
.catch(error => console.log(error))