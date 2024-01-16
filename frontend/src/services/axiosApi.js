import {apiConfig} from "@/configuration/api";
import axios from "axios";

const instance = axios.create({
  baseURL: apiConfig.host
});

export default instance;
