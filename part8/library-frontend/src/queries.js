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
    author
    published
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($genres:[String!]!, $title:String!, $author:String!, $published:Int!){
  addBook(genres: $genres, title:$title, author:$author, published:$published){
    title
    author
    published
    genres
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