// import {Mercure} from "../interface/mercure";
import * as process from "process";
import dotenv from 'dotenv';
import https from "node:https";
// import http from "node:http";
dotenv.config();

const JWT: string = process.env.JWT;
const SERVER_NAME: string = process.env.MERCURE_PUBLISH_URL;
const PORT_MERCURE: number = process.env.PORT_MERCURE ? parseInt(process.env.PORT_MERCURE) : 3000;

export const MercureConfig: https.RequestOptions = {
  method: 'POST',
  hostname: SERVER_NAME,
  port: PORT_MERCURE,
  path: '/.well-known/mercure',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${JWT}`,
  }
};
