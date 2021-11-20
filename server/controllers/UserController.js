import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../Models/User.js'

class UserController {

    static signIn = async (req, res) => {
        const { email, password } = req.body

        try {
            // look for user with email
            const existingUser = await User.findOne({ email })
            // if user doesnt exist end the request
            if ( !existingUser ) return res.status(404).json({ message: "User doesn't exist" })
            // compare provided password to existing user's password
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            // if password is incorrect, end it
            if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong password." })
            // if both the user email and password are correct...
            // create a token using jsonwebtoken. 'test' is a secret word that i need to know.
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })
            // send back the user info and the token
            res.status(200).json({ result: existingUser, token })
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
    
    static signUp = async (req, res) => {
        const { email, password, confirmPassword, firstName, lastName } = req.body

        try {
            // check if there's already a user with provided email
            const existingUser = await User.findOne({ email })
            // if user exists end the request
            if ( existingUser ) return res.status(404).json({ message: "User with email already exists" })
            // compare password and confirmPassword
            if ( password !== confirmPassword ) return res.status(400).json({ message: "failed to confirm password" })
            // hash password, 12 is the dificulty of hashing
            const hashedPassword = await bcrypt.hash(password, 12)
            // create the user
            const result = await User.create({ email, password: hashedPassword, name: `${firstName}, ${lastName}` })

            // create a token using jsonwebtoken. 'test' is a secret word that i need to know.
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
            // send back the user info and the token
            res.status(200).json({ result, token })
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }

}

export default UserController