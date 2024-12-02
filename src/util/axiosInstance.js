import axios from "axios";
import { getUser } from "./common";
import { domainBE, domainFE } from "./constant";

const axiosInstance = axios.create({
	baseURL: domainBE,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		config.headers["Content-Type"] = "application/json-patch+json";

		const user = getUser();
		if (user) {
			config.headers.Authorization = "Bearer " + user?.token;
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data

		return response.data;
	},
	function (error) {
		if (error.response?.status === 401) {
			localStorage.clear();
			window.location.href = domainFE + "/Login";
		}

		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error.response.data);
	}
);

export default axiosInstance;
