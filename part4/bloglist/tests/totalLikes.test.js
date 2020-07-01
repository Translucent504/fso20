const listHelper = require('../utils/list_helper')

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