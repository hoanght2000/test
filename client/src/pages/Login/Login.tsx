import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormType } from '../../@types';
import authApi from '../../apis/auth.api';
import { AppContext } from '../../app.context';
import Input from '../../components/Input';
import Label from '../../components/Label';
import AuthLayout from '../../layouts/AuthLayout';
import { saveAuth } from '../../utils/auth';

const FormDefault: FormType = {
	mail: '',
	password: '',
};

const Login = () => {
	const { setAuth } = useContext(AppContext);
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm<Omit<FormType, 'password_confirm'>>({
		defaultValues: FormDefault,
	});

	const loginMutate = useMutation({
		mutationFn: authApi.login,
	});

	const handleLogin = handleSubmit((values) => {
		loginMutate.mutate(values, {
			onSuccess(data, variables, context) {
				saveAuth(data.data.data);
				setAuth(data.data.data);
				navigate('/');
				toast.success(data.data.message);
			},
		});
	});

	return (
		<AuthLayout>
			<form className='flex flex-col gap-5' onSubmit={handleLogin}>
				<div>
					<Label>Email</Label>
					<Controller
						control={control}
						name='mail'
						render={({ field }) => <Input placeholder='Enter your email...' {...field} />}
					/>
				</div>
				<div>
					<Label>Password</Label>
					<Controller
						control={control}
						name='password'
						render={({ field }) => <Input placeholder='Enter your password...' {...field} />}
					/>
				</div>
				<div className='w-full'>
					<button className='mb-2 w-full rounded-md bg-blue-500 py-2 text-white'>Login</button>
					<p className='text-center text-sm font-semibold text-white'>
						Bạn chưa có tai khoản?{' '}
						<Link className='text-yellow-300 hover:underline' to={'/register'}>
							Sign Up
						</Link>
					</p>
				</div>
			</form>
		</AuthLayout>
	);
};

export default Login;
