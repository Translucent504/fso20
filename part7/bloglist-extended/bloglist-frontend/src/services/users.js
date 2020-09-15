import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    const users = response.data.map(user => (
        {
            name: user.name ? user.name : user.username,
            username: user.username,
            id: user.id,
            blogs: user.blogs
        }
    ))
    return users
}

export default { getAll }