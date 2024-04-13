import axios from 'axios'
import type { AuthModel } from './models'

const baseUrl = 'http://localhost:3000'

export const login = async (data: AuthModel) => {
  return axios.post(`${baseUrl}/auth/login`, {
    email: data.email,
    password: data.password
  })
}

export const invoices = async () => {
  const localUser = localStorage.getItem('user')
  return axios.get(`${baseUrl}/invoice`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localUser ?? "").accessToken}`
    }
  })
}
