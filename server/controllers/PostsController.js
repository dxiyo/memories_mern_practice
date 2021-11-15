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
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const post = await Post.findById(_id)
        const updatedPost = await Post.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, { new: true } )

        res.json(updatedPost)
    }
}

export default PostsController