// import axios from 'axios';

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});
