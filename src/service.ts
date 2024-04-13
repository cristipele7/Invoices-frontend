import axios from 'axios'
import type { AuthModel } from './models'

const baseUrl = 'http://localhost:3000'

export const login = async (data: AuthModel) => {
  return axios.post(`${baseUrl}/auth`, {
    email: data.email,
    password: data.password
  })
}

export const getInvoices = async () => {
  const localUser = localStorage.getItem('user')
  return axios.get(`${baseUrl}/invoice`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localUser ?? "").accessToken}`
    }
  })
}

export const getInvoice = async (id: number) => {
  const localUser = localStorage.getItem('user')
  return axios.get(`${baseUrl}/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localUser ?? "").accessToken}`
    }
  })
}

export const totalAmount = async () => {
  const localUser = localStorage.getItem('user')
  return axios.get(`${baseUrl}/invoice/total`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localUser ?? "").accessToken}`
    }
  })
}
