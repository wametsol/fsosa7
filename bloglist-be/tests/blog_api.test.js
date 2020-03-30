const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { formatBlog, initialBlogs, nonExistingId, blogsInDB} = require('./test_helper')


  beforeAll(async () => {
      await Blog.remove({})
      const blogObjects = initialBlogs.map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    
  })
  describe.skip('blog_api tests', () =>{
test('blogs are returned as json', async () => {
  const blogsInDb = await blogsInDB()
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
})

test('there are 5 blogs', async () => {
    const blogsDB = await blogsInDB()

    const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsDB.length)
})
test('blogs contains title: type wars', async () => {
    const res = await api
    .get('/api/blogs')
    const contents = res.body.map(r => r.title)

    expect(contents).toContain('Type wars')
})
test('a valid blog can be addded', async () => {
  const blogsAtStart = await blogsInDB()
  const newBlog = {
    _id: "5a422bc61b54a62323541523",
      title: "Tester blog",
      author: "B. Blogger",
      url: "blog.blogger.com",
      likes: 55,
      __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAfter = await blogsInDB()
  expect(blogsAfter.length).toBe(blogsAtStart.length+1)

  const contents = blogsAfter.map(r => r.title)

  
  expect(contents).toContain('Tester blog')
})

test('if likes is undefined, it is set to 0', async () => {
  const newBlog = {
    _id: "5a422bc61b54a62322421asda1523",
      title: "Tester blog2",
      author: "B. Blogger",
      url: "blog.blogger.com",
      __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const res = await blogsInDB()


  const content = res.find(r => 
  r.title === 'Tester blog2')
  expect(content.likes).toBe(0)
  
})

test('if title & url is undefined, return 400 Bad request', async () => {
  const newBlog = {
    _id: "5a422bc61b54a62354321asda1523",
      author: "B. Blogger",
      likes: "100",
      __v: 0
  }
  const blogit = await blogsInDB()

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const res = await blogsInDB()


  expect(res.length).toBe(blogit.length)
  
})




  })

  afterAll(() => {
    server.close()
})