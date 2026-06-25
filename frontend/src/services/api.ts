import axios from 'axios';

// ipconfig para descobrir o ip local
const SEU_IP_LOCAL = 'IP_LOCAL'; 
const PORTA_SERVIDOR = '3000';

const api = axios.create({
  baseURL: `http://IP_LOCAL:3000/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;

//iniciar o servidor com npx tsx src/index.ts