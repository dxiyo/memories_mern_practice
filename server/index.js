import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postsRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

// const CONNECTION_URL = "mongodb+srv://abdullah:234234234@cluster0.hijjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.port || 5000

mongoose.connect(process.env.CONNECTION_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    // these 2 object parameters are optional but theyre set to true to avoid getting warnings in the console
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message) )

// mongoose.set('useFindAndModify', false) // also just added to avoid warrings in console
app.use('/posts', postsRoutes)
app.use('/user', userRoutes)