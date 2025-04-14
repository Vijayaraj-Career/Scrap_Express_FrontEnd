import axios from "axios";
import axiosInstance from "../AuthContext/AuthCard";

class APIService {
    LoginAPI = (data) => new Promise((resolve, reject) => {
        axiosInstance
            .post('/login', data)
            .then((response) => resolve(response.data))
            .catch(({ response }) => reject(response.data))

    })
}

const instance = new APIService();
export default instance;