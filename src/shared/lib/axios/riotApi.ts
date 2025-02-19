import axios from 'axios';

const riotApi = axios.create({
  baseURL: process.env.RIOT_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10 * 1000,
});

export default riotApi;