const listHelper = require('../utils/list_helper')
const { formatBlog, initialBlogs, nonExistingId, blogsInDB} = require('./test_helper')
const blogs = initialBlogs
  describe.skip('list helpers', () =>{

    test('dummy is called', () => {
        
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
      })



describe('total likes', () => {
    
      test('when total likes of all post is correct', () => {
          const result = listHelper.totalLikes(blogs)
          expect(result).toBe(36)
      })
})

describe('favorite blog', () => {
    test('return the most liked blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})
describe('most blogs', () => {
    test('return the blogger with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('return the blogger with most likes total', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})

})