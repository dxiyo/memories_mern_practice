import express from 'express'
import PostsController from '../controllers/PostsController.js'
const router = express.Router()

router.get('/', PostsController.show)
router.get('/:id', PostsController.showOne)

router.post('/', PostsController.create)

router.patch('/:id', PostsController.update)

router.delete('/:id', PostsController.delete)

router.patch('/:id/likePost', PostsController.like)

export default router