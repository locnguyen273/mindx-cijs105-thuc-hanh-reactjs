import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getAllPostService = async () => {
  return await axios.get(`${API_URL}/posts`);
  
}