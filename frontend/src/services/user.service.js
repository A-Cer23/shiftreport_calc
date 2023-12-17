import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "admin/";


const getAdminAllUsers = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getPublicContent = () => {
    return axios.get(API_URL + "public")
}

const UserService = {
    getAdminAllUsers,
    getPublicContent
};

export default UserService;
