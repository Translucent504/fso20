import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommended = (props) => {
    const [genre, setGenre] = useState(null)
    const [books, setBooks] = useState([])
    const [getBooks, { data }] = useLazyQuery(BOOKS_BY_GENRE)
    const user = useQuery(ME)

    useEffect(() => {
        if (user?.data && props.token) {
            setGenre(user?.data?.me?.favoriteGenre)
            getBooks({
                variables: { genre: user?.data?.me?.favoriteGenre }
            })
        }
    }, [user.data]) // eslint-disable-line

    useEffect(() => {
        if (data) {
            setBooks(data.allBooks)
        }
    }, [data]) // eslint-disable-line

    if (!props.show) {
        return null
    }


    return (
        <div>
            <h2>books</h2>
            <p>books in your favorite genre <b>{genre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended