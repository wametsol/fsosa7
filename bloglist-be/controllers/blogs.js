const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogsRouter.use(bodyParser.json())


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
  
  const formatBlog = (blog) => {
      return{
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        comments: blog.comments,
        user: blog.user
      }
    }
  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user')

    response.json(blogs.map(formatBlog))
    
})
  
blogsRouter.post('/:id/comments', async (request, response) => {
  
  try {
    body = request.body
    const blog = await Blog.findById(request.params.id)
    const commentedBlog = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        comments: blog.comments.concat(body.comment),
        likes: blog.likes,
        user: blog.user 
    }
    await Blog.findByIdAndUpdate(request.params.id, commentedBlog)
    response.json(formatBlog(commentedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'something went wrong'})
    
  }
})
  blogsRouter.post('/', async (req, res) => {
    
    
    try{
      const body = req.body
      const token = getTokenFrom(req)

      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      
    
    if (body.title === undefined || body.url === undefined){
      return res.status(400).json({error: 'title or url missing'})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      comments: [],
      user:  user._id
    })
    const savedBlog = await blog.save()
    res.json(formatBlog(savedBlog))
  }catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'something went wrong'})
    
  }

  
    
  })
  blogsRouter.put('/:id', async (request, response) => {
    try {
      const body = request.body
      
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        comments: body.comments,
        likes: body.likes
      }

      await Blog.findByIdAndUpdate(request.params.id, blog)
      response.json(formatBlog(blog))
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'wrong id'})
      
    }
  })
  blogsRouter.delete('/:id', async (req, response) => {
    try{
      const body = req.body
      const token = getTokenFrom(req)

      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      const blogToDelete = await Blog.findById(req.params.id)
      if(JSON.stringify(blogToDelete.user) !== JSON.stringify(user._id)){
        return response.status(401).json({ error: 'not authorized' })
      }

      const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
      response.json(formatBlog(deletedBlog))
    }
    catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'wrong id'})
      
    }
  })
  
  module.exports = blogsRouter
  
  