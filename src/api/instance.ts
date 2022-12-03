import axios from 'axios';

function createInstance(baseUrl: string) {
  return axios.create({ baseURL: baseUrl });
}

export const apiInstance = createInstance('https://uh9mp9f92g.execute-api.us-east-1.amazonaws.com/');
