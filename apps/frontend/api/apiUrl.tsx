import React from 'react';
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.API_URL ?? "http://localhost:8000/"

export const API_URL = BASE_URL + "api"

export default {
  API_URL
};
