import axios from 'axios';
import { authService } from './authService';

const token = authService.getAuthToken();

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
