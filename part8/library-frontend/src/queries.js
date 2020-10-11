import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($genres:[String!]!, $title:String!, $author:String!, $published:Int!){
  addBook(genres: $genres, title:$title, author:$author, published:$published){
    title
    author{
      name
    }
    published
    genres
    id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name:String!, $born:Int!){
  editAuthor(name:$name, setBornTo:$born){
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password:$password){
    value
  }
}
`

export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`

export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre:String!){
  allBooks(genre:$genre){
    title
    author{
      name
    }
    published
    genres
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
    genres
    id
  }
}`