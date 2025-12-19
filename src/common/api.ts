import axios from 'axios'
import { API_ROOT_URL } from './config/config'

import { initApiInterceptors } from './api/initApiInterceptors'

export const api = axios.create({
  baseURL: API_ROOT_URL,
})

initApiInterceptors(api)
