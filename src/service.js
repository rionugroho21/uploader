import axios from 'axios';

export function upload(str) {
  return axios.post('https://api.myjson.com/bins', {
    img: str
  });
}

export function download(uri) {
  return axios.get(uri);
}
