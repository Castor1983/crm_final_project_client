import axios from "axios";

import {baseUrl} from "../common/urls.ts";

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiAuth = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

apiAuth.interceptors.request.use((config) => {
    const storedAuth = localStorage.getItem("auth-storage");
    const accessToken = storedAuth ? JSON.parse(storedAuth).state?.accessToken : null;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));