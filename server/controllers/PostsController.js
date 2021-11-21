import Post from "../Models/Post.js"
import mongoose from "mongoose"

class PostsController {
    static show = async (req, res) => {
        try {
            const posts = await Post.find()

            res.status(200).json(posts)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
    static showOne = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
    
    static create = async (req, res) => {
        // the stuff from the form
        const post = req.body
        // creates the post but not save it.
        const newPost = new Post(post) 
        try {
            // saves the post
            await newPost.save()
            res.status(201).json(newPost)

        } catch (error) {
            res.status(409).json({message: error.message})
        }
    }

    static update = async (req, res) => {
        const {id: _id} = req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
        const post = {...req.body, _id}
        const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
        res.json(post)
    }

    static delete = async (req, res) => {
        const {id: _id} = req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        await Post.findByIdAndRemove(_id)

        res.json({ message: 'Post deleted successfully.'})
    }

    static like = async (req, res) => {
        const {id: _id} = req.params
        
        // thanks to the auth middleware, we can check if the user is signed in by checking if req.userId, which was added in the auth middleware, exists or not.
        if (!req.userId) return res.json({ message: "Unauthenticated" }) 
        
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const post = await Post.findById(_id)

        // check if the id of the user exists in the post likes using the index function. if the index of the users id is -1 that means it's not there which means the user didnt like before.
        const index = post.likes.findIndex( id => id === String(req.userId) )

        // if the user never liked before (if index is -1) like it, else unlike it
        if (index === -1) {
            // likes the post
            post.likes.push(req.userId)
        } else {
            // unlikes the post
            post.likes.filter(id => id !== req.userId)
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true } )

        res.json(updatedPost)
    }
}

export default PostsController