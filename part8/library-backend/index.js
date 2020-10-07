const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./Models/Book')
const Author = require('./Models/Author')
const User = require('./Models/User')
const MONGODB_URI = "mongodb+srv://fullstack:infinitude@cluster0.skbal.mongodb.net/graphql?retryWrites=true&w=majority"
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secretlol'

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


const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
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
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return Book.collection.countDocuments({ author: author._id })
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author & !args.genre) {
        // no genre or author provided
        return Book.find({}).populate('author')
      } else if (!args.genre) {
        // author provided but no genre provided 
        return books.filter(book => book.author === args.author)
      } else if (!args.author) {
        // genre provided but no author provided
        const books = await Book.find({ genres: { $in: args.genre } }).populate('author')
        return books
      }
      // both genre and author provided
      return books.filter(book => book.genres.includes(args.genre) & book.author === args.author)
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authorized')
      }
      const author = await Author.findOne({ name: args.author })
      if (author !== null) {
        // author already exists
        try {
          const newBook = new Book({ ...args, author: author._id })
          return newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      // author does not exist
      try {
        const newAuthor = new Author({ name: args.author, born: null })
        const newBook = new Book({ ...args, author: newAuthor._id })
        await newAuthor.save()
        return (await newBook.save()).populate('author').execPopulate()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authorized')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author._id) {
        return null
      }
      try {
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      try {
        console.log(args)
        const user = new User(args)
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'potty') {
        throw new UserInputError('invalid credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      const token = jwt.sign(userForToken, JWT_SECRET)
      return { value: token }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
