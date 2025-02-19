import axios from "axios";

import {baseUrl} from "../common/urls.ts";
import useLoaderStore from "../store/loader.ts";

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
    useLoaderStore.getState().setLoading(true);
    return config;
}, (error) =>  {
    useLoaderStore.getState().setLoading(false);
    if (error.response && error.response.status === 401) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
apiAuth.interceptors.response.use(
    (response) => {
        useLoaderStore.getState().setLoading(false);
        return response;
    },
    (error) => {
        useLoaderStore.getState().setLoading(false);
        return Promise.reject(error);
    }
);