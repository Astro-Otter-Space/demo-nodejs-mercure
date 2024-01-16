import {Mercure} from "../interface/mercure";
import * as process from "process";

const JWT = process.env.JWT;

export const MercureConfig: Mercure = {
  hostname: 'https://localhost',
  port: 3000,
  path: '/.well-known/mercure',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${JWT}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
};
