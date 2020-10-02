const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./Models/Book')
const Author = require('./Models/Author')

const MONGODB_URI = "mongodb+srv://fullstack:infinitude@cluster0.skbal.mongodb.net/graphql?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => {
    console.log('connected to mongodb')
  }).catch(() => {
    console.log('failed to connect to mongodb')
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!): Book

    editAuthor(
      name: String!
      setBornTo: Int!): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      const totalBooks = books.reduce((total, book) => book.author === root.name ? total + 1 : total, 0)
      return totalBooks
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author & !args.genre) {
        // no genre or author provided
        return Book.find({})
      } else if (!args.genre) {
        // no genre provided
        return books.filter(book => book.author === args.author)
      } else if (!args.author) {
        //no author provided
        return books.filter(book => book.genres.includes(args.genre))
      }
      // both genre and author provided
      return books.filter(book => book.genres.includes(args.genre) & book.author === args.author)
    },
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() }
      if (authors.find(author => author.name === args.author)) {
        // author already exists
        books = books.concat(newBook)
        return newBook
      }
      // author does not exist
      const newAuthor = { name: args.author, born: null, id: uuid() }
      authors = authors.concat(newAuthor)
      books = books.concat(newBook)
      return newBook
    },
    editAuthor: (root, args) => {
      const tmp = authors.find(author => author.name === args.name)
      if (!tmp) {
        return null
      }
      const updatedAuthor = { ...tmp, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
