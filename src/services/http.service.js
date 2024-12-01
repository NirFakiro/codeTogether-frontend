import Axios from 'axios'

const BASE_URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production' ? '/api' : '//localhost:3000/api'

const axios = Axios.create()

export const httpService = {
  get(endpiont, data) {
    return ajax(endpiont, 'GET', data)
  },
  post(endpiont, data) {
    return ajax(endpiont, 'POST', data)
  },
  delete(endpiont, data) {
    return ajax(endpiont, 'DELETE', data)
  },
}

async function ajax(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`
  const params = method === 'GET' ? data : null

  const option = { url, method, data, params }

  try {
    const res = await axios(option)
    return res.data
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    throw err
  }
}
