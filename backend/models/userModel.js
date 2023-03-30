const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email })

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (exists) {
        throw Error('Email is already in use')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email should contains @ and .')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password should contains numbers, uppercase letter and minimum 8 characters')
    }

    const hash = await bcrypt.hash(password, 10)


    const user = await this.create({
        email,
        password: hash
    })

    return user
}


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!user) {
        throw Error('User is not exists')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}






module.exports = mongoose.model('User', userSchema)