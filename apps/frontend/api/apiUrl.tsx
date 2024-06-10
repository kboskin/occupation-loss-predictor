import React from 'react';
import dotenv from "dotenv";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const API_URL = BASE_URL + "api"

export default {
  API_URL
};
