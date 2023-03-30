const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { getPosts, getUserPosts, getPost, createPost, deletePost, updatePost, addComment, deleteComment, unlikePost, likePost } = require('../controllers/postsController')


router.use(requireAuth)

// get all posts

router.get('/', getPosts)

// get all user posts

router.get('/user', getUserPosts)

// get a single post

router.get('/:id', getPost)

// create a post

router.post('/', createPost)

// delete post

router.delete('/:id', deletePost)

// update a post

router.patch('/:id', updatePost)

// add comment

router.patch('/addcomment/:id', addComment)

// delete comment

router.patch('/deletecomment/:id', deleteComment)

// like

router.patch('/like/:id', likePost)

// unlike

router.patch('/unlike/:id', unlikePost)


module.exports = router