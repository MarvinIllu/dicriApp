import { config } from "dotenv";
config();


export const USER = 'sa'
export const PASSWORD = '12345'
export const SERVER = 'localhost'
export const DB = 'dicriDB'
export const ENCRYPT = false // Disable encryption
export const TRUSTSERVERCERTIFICATE = true
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

