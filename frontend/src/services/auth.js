import { request } from './api'

export const register = (payload) => request('/auth/register', { method: 'POST', body: payload, auth: false })
export const login = (payload) => request('/auth/login', { method: 'POST', body: payload, auth: false })
export const fetchMe = () => request('/users/me')
export const updateProfile = (payload) => request('/users/me', { method: 'PATCH', body: payload })
export const changePassword = (payload) => request('/users/me/password', { method: 'POST', body: payload })
