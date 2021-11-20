import mongoose from 'mongoose'
const { Schema } = mongoose;

class User {
    static schema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        id: { type: String },
        
    })

    static UserModel = mongoose.model('User', this.schema)
}

export default User.UserModel