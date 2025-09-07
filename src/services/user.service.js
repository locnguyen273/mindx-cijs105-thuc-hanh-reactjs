import axios from 'axios';

export const getAllUsersService = async () => {
  return await axios.get(`https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=68a1c6779f3bbb05c6342994`);
}