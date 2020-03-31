const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
const User = require('../models/user')
blogsRouter.use(bodyParser.json())
  
  const formatBlog = (blog) => {
      return{
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
      }
    }
  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user')

    response.json(blogs.map(formatBlog))
    
})
  blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user')

    response.json(blogs)
  })
  
  blogsRouter.post('/api/blogs', async (req, res) => {
    
    
    try{
    const body = req.body
   
    
    if (body.title === undefined || body.url === undefined){
      return res.status(400).json({error: 'title or url missing'})
    }
    useR = await User.find({})
    console.log(useR[1])
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user:  useR[1]._id
    })
    const savedBlog = await blog.save()
    res.json(formatBlog(savedBlog))
  }catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'something went wrong'})
    
  }
    
  })
  blogsRouter.put('/api/blogs/:id', async (request, response) => {
    try {
      const body = request.body
      
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }

      await Blog.findByIdAndUpdate(request.params.id, blog)
      response.json(formatBlog(blog))
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'wrong id'})
      
    }
  })
  blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    try{
      const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
      response.json(formatBlog(deletedBlog))
    }
    catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'wrong id'})
      
    }
  })
  
  module.exports = blogsRouter
  
  