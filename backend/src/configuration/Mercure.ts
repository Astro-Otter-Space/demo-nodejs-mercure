import {Mercure} from "../interface/mercure";
import * as process from "process";
import dotenv from 'dotenv';
dotenv.config();

const JWT: string = process.env.JWT;
const SERVER_NAME: string = process.env.MERCURE_PUBLISH_URL;
const PORT_MERCURE: number = process.env.PORT_MERCURE ? parseInt(process.env.PORT_MERCURE) : 3000;

export const MercureConfig: Mercure = {
  hostname: SERVER_NAME,
  port: PORT_MERCURE,
  path: '/.well-known/mercure',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${JWT}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
