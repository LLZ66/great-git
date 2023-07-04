import axios from "axios";
import { printErrorLog } from "./index.js";

const service = axios.create({
    baseURL: "http://127.0.0.1:7001/",
});

function onSuccess(response) {
    return response.data;
};

function onFailed(error) {
    printErrorLog(error)
}

service.interceptors.response.use(onSuccess,onFailed);

export default service;