import axios from 'axios';
import { toast } from 'react-toastify';

import { baseUrl } from '../common/urls.ts';
import { fetchRefresh } from '../requests/requests.ts';
import { useAuthStore } from '../store/auth.ts';
import useLoaderStore from '../store/loader.ts';

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiAuth.interceptors.request.use(
  config => {
    const storedAuth = localStorage.getItem('auth-storage');
    const accessToken = storedAuth
      ? JSON.parse(storedAuth).state?.accessToken
      : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    useLoaderStore.getState().setLoading(true);
    return config;
  },
  error => {
    useLoaderStore.getState().setLoading(false);
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
apiAuth.interceptors.response.use(
  response => {
    useLoaderStore.getState().setLoading(false);
    return response;
  },
  async error => {
    if (error.response) {
      useLoaderStore.getState().setLoading(false);
      const status = error.response.status;
      const message = error.response.data?.message || 'Something went wrong';
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await fetchRefresh();
          originalRequest.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;
          return apiAuth(originalRequest);
        } catch (refreshError) {
          console.error('Session expired. Redirecting to login...');
          return Promise.reject(refreshError);
        }
      }

      switch (status) {
        case 400:
          toast.error(`Bad Request: ${message}`);
          break;
        case 403:
          toast.error("Forbidden! You don't have access.");
          break;
        case 404:
          toast.error('Not Found! The requested resource does not exist.');
          break;
        case 500:
          toast.error('Server Error! Please try again later.');
          break;
        default:
          toast.error(message);
          break;
      }
    } else {
      toast.error('Network Error! Please check your internet connection.');
    }

    return Promise.reject(error);
  },
);
