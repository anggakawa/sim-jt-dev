import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  // baseURL: 'http://10.140.15.100:3000/api/',
});

export default instance;
