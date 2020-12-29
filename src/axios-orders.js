import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-b77e3-default-rtdb.firebaseio.com/",
});

export default instance;
