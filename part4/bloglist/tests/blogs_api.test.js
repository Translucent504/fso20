const supertest = require('supertest');
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const testHelper = require('../tests/test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
        username: "repeated",
        name: "IamRepeated",
        password: "123123123"
    })

    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('Add Users', () => {
    test('should return error for short username', async () => {
        const invalidUser = {
            username: "AS",
            name: "ASLAM",
            password: "123123123"
        }

        const response = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

        expect(response.body.error).toContain("shorter than the minimum allowed length (3)")
    })

    test('should return error for short password', async () => {
        const invalidUser = {
            username: "ASLAM777",
            name: "the root master",
            password: "1"
        }

        const response = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

        expect(response.body.error).toContain("password too short")
    })

    test('should return error for repeated username', async () => {
        const invalidUser = {
            username: "repeated",
            name: "IamRepeated",
            password: "123123123"
        }

        const response = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

        expect(response.body.error).toContain("unique")
    })
    
})


describe('Get Blogs', () => {
    const allBlogs = testHelper.initialBlogs
    test('should return json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should have id field', async () => {
        const result = await api
            .get('/api/blogs')
        expect(result.body[0].id).toBeDefined()
    })

    test('should return all notes', async () => {
        const result = await api
            .get('/api/blogs')
        expect(result.body).toHaveLength(allBlogs.length)
    })

})

describe('Add Blogs', () => {
    test('should increase length of list on addition', async () => {

        await api
            .post('/api/blogs')
            .send(testHelper.extraBlog)
            .expect(201)

        const finalBlogs = await api.get('/api/blogs')
        expect(finalBlogs.body).toHaveLength(testHelper.initialBlogs.length + 1)
    })

    test('should contain new blog in list after addition', async () => {

        await api
            .post('/api/blogs')
            .send(testHelper.extraBlog)
            .expect(201)

        const finalBlogs = await api.get('/api/blogs')
        const finalBlogsWithoutIds = finalBlogs.body.map(b => ({
            title: b.title,
            author: b.author,
            url: b.url,
            likes: b.likes
        }
        ))
        expect(finalBlogsWithoutIds).toContainEqual(testHelper.extraBlog)
    })

    test('should default to 0 likes if not included in request', async () => {
        blogToAdd = {
            title: "ABDUL THE TESTER",
            url: "google.com/abdul",
            author: "not abodl"
        }

        await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        blogsAtEnd.body.forEach(b => delete b.id)
        expect(blogsAtEnd.body).toContainEqual({
            ...blogToAdd,
            likes: 0
        })
    })

    test('should 400 Bad Request if Url AND title are missing', async () => {
        const blogToAdd = {
            author: "Empty Abdul",
            likes: 9000
        }
        await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(400)
    })   

})

describe('Delete Blogs', () => {
    test('should not contain deleted blog in list after valid deletion', async () => {
        // These sort of requests should be get requests, maybe refactor 
        // them into the test helper.
        const blogToDeleteId = testHelper.initialBlogs[0]._id 

        await api
        .delete(`/api/blogs/${blogToDeleteId}`)
        .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')
        const ids = blogsAtEnd.body.map(b => b.id)
        expect(ids).not.toContain(blogToDeleteId)
    })

    test('should decrease length of list by 1 after deletion', async () => {
        const blogToDeleteId = testHelper.initialBlogs[0]._id
        await api
        .delete(`/api/blogs/${blogToDeleteId}`)
        .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(testHelper.initialBlogs.length - 1)
    })
    
    
})

describe('Update Blogs', () => {
    test('should show updated values after put request', async () => {
        blogToUpdate = {
            id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 10,
        }

        await api
        .put(`/api/blogs/${blogToUpdate.id}`) // post?
        .send(blogToUpdate)
        .expect(201)

        const result = await api.get('/api/blogs')
        expect(result.body).toContainEqual(blogToUpdate)
    })
    
})

describe('favorite Blog', () => {
    test('should return dummy temp for empty blog list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({
            title: "DUMMY TEMP",
            author: "DUMMY TEMP",
            likes: 0
        })
    })

    test('should return single blog if list has one entry', () => {
        const singleBlog = testHelper.initialBlogs[0]
        const result = listHelper.favoriteBlog([singleBlog])
        expect(result).toEqual({
            title: singleBlog.title,
            author: singleBlog.author,
            likes: singleBlog.likes
        })
    })

    test('should return blog with most likes for multiple blogs in list', () => {
        const multipleBlogs = testHelper.initialBlogs
        const result = listHelper.favoriteBlog(multipleBlogs)
        expect(result).toEqual({ title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 })
    })

})

describe('Most blogs', () => {
    const multipleBlogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
    ]

    test('should return empty object for empty list', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('should return single author and count 1 for single blog', () => {
        const result = listHelper.mostBlogs([{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }])
        expect(result).toEqual({
            author: "Michael Chan",
            blogs: 1
        })
    })

    test('should return author and blog count for author with most blogs for multiple entries in list', () => {
        const result = listHelper.mostBlogs(multipleBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('Most likes', () => {
    const multipleBlogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
    ]

    test('should return empty object for empty list', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })

    test('should return single author and likes for single blog', () => {
        const result = listHelper.mostLikes([{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }])
        expect(result).toEqual({
            author: "Michael Chan",
            likes: 7
        })
    })

    test('should return author and like count for author with most blogs for multiple entries in list', () => {
        const result = listHelper.mostLikes(multipleBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

describe('total Likes', () => {
    const multipleBlogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
    ]
    test('returns 0 for no blogs in list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('returns correct for single blog in list', () => {
        const result = listHelper.totalLikes([{ author: 'asd', likes: 2 }])
        expect(result).toBe(2)
    })

    test('returns correct for multiple blogs in list (I)', () => {
        const result = listHelper.totalLikes([{ author: 'asd', likes: 2 }, { author: 'asd', likes: 5 }, { author: 'asd', likes: 7 }])
        expect(result).toBe(14)
    })

    test('returns correct for multiple blogs in list (II)', () => {
        const result = listHelper.totalLikes(multipleBlogs)
        expect(result).toBe(36)
    })
})


afterAll(() => {
    mongoose.connection.close()
})