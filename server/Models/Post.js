import mongoose from 'mongoose'
const { Schema } = mongoose;

class Post {
    static schema = new Schema({
        title: String,
        message: String,
        creator: String,
        tags: [String],
        selectedFile: String,
        likeCount: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    })

    static PostMessage = mongoose.model('PostMessage', this.schema)
}

export default Post.PostMessage