import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3002/api/login'

const login = async crendtials => {
  const response = await axios.post(baseUrl, crendtials)
  return response.data
}

export default { login }