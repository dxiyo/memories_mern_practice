import express from 'express'
import PostsController from '../controllers/PostsController.js'

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', PostsController.show)
// router.get('/:id', PostsController.showOne)

router.post('/', auth, PostsController.create)

router.patch('/:id', auth, PostsController.update)

router.delete('/:id', auth, PostsController.delete)

router.patch('/:id/likePost', auth, PostsController.like)

export default router