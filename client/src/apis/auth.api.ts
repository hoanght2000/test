import { ApiResponse, FormType, LoginType } from '../@types';
import http from '../utils/http';

const URL = 'userapi';
const authApi = {
	login(body: Omit<FormType, 'password_confirm'>) {
		return http.post<ApiResponse<LoginType>>(`${URL}/login`, body);
	},
	register(body: Omit<FormType, 'password_confirm'>) {
		return http.post<ApiResponse<LoginType>>(`${URL}/register`, body);
	},
};

export default authApi;
