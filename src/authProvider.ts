import { AuthProvider } from '@pankod/refine-core'
import nookies from 'nookies'
import axios from 'axios'

export const authProvider: AuthProvider = {
  login: () => {
    return Promise.resolve()
  },
  logout: () => {
    return Promise.resolve('/api/auth/logout')
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject()
    }

    return Promise.resolve()
  },
  checkAuth: async (params) => {
    const cookies = nookies.get(params)

    try {
      const res = await axios.get(`http://localhost:3000/api/auth/me`, {
        headers: {
          cookie: `appSession=${cookies['appSession']}`,
        },
      })
      return res.status === 200 ? Promise.resolve() : Promise.reject()
    } catch (error) {
      return Promise.reject()
    }
  },
  getPermissions: () => Promise.resolve(),
}
