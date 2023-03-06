export interface ApiResponse<data> {
	message: string;
	data: data;
}

export interface New {
	id: string;
	title: string;
	description: string;
	author: string;
	imageURL: string;
}

export interface FormType {
	mail: string;
	password: string;
	password_confirm?: string;
}

export interface LoginType {
	accessToken: string;
	refreshToken: string;
	mail: string;
	expris: string;
}
