import axios, { AxiosInstance } from 'axios';
import { ApiResponse, LoginType } from '../@types';
import authApi from '../apis/auth.api';
import { getAuth } from './auth';

const handleRefreshTK = async (mail: string) => {
	{
		const res = await axios.post<ApiResponse<LoginType>>(
			`https://localhost:44389/api/userapi/refresh_token/${mail}`
		);
		return res.data.data.accessToken;
	}
};

class Http {
	instance: AxiosInstance;
	constructor() {
		this.instance = axios.create({
			baseURL: 'https://localhost:44389/api/',
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json',
			},
		});
		this.instance.interceptors.request.use(
			async (config) => {
				const date = new Date();
				const auth: LoginType = getAuth();
				const ex = new Date(auth?.expris);
				if (auth && auth.accessToken) {
					if (ex.getTime() / 1000 < date.getTime() / 1000) {
						const accessToken = await handleRefreshTK(auth.mail);
						config.headers.Authorization = `Bearer ${accessToken}`;
						return config;
					}
					config.headers.Authorization = `Bearer ${auth.accessToken}`;
				}
				return config;
			},
			(error) => Promise.resolve(error)
		);
	}
}

const http = new Http().instance;
export default http;
