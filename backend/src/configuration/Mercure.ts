import {Mercure} from "../interface/mercure";
import * as process from "process";
import dotenv from 'dotenv';
dotenv.config();

const JWT: string = process.env.JWT;
// const SERVER_NAME: string = process.env.MERCURE_PUBLISH_URL;
// const PORT_MERCURE: number = process.env.PORT_MERCURE ? parseInt(process.env.PORT_MERCURE) : 3000;

export const MercureConfig: Mercure = {
  method: 'POST',
  hostname: 'localhost', //SERVER_NAME,
  port: 3000, //PORT_MERCURE,
  path: '/.well-known/mercure',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${JWT}`,
  },
  maxRedirects: 20
};
