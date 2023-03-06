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
	password_confirm: '',
};
const Register = () => {
	const { setAuth } = useContext(AppContext);
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm<FormType>({
		defaultValues: FormDefault,
	});

	const loginMutate = useMutation({
		mutationFn: authApi.register,
	});
	const handleRegister = handleSubmit((values) => {
		const body: Omit<FormType, 'password_confirm'> = {
			mail: values.mail,
			password: values.password,
		};
		loginMutate.mutate(body, {
			onSuccess(data, variables, context) {
				saveAuth(data.data.data);
				setAuth(data.data.data);
				navigate('/');
				toast.success('Registration successful');
			},
		});
	});

	return (
		<AuthLayout>
			<form className='flex flex-col gap-5' onSubmit={handleRegister}>
				<div>
					<Label>Email</Label>
					<Controller
						control={control}
						name='mail'
						render={({ field }) => <Input {...field} placeholder='Enter your email...' />}
					/>
				</div>
				<div>
					<Label>Password</Label>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<Input {...field} type='password' placeholder='Enter your password...' />
						)}
					/>
				</div>
				<div>
					<Label>Password confirm</Label>
					<Controller
						control={control}
						name='password_confirm'
						render={({ field }) => (
							<Input {...field} type='password' placeholder='Confirm password...' />
						)}
					/>
				</div>
				<div className='w-full'>
					<button className='mb-2 w-full rounded-md bg-blue-500 py-2 text-white'>Sign Up</button>
					<p className='text-center text-sm font-semibold text-white'>
						Bạn đã có tài khoản?{' '}
						<Link className='text-yellow-300 hover:underline' to={'/login'}>
							Login
						</Link>
					</p>
				</div>
			</form>
		</AuthLayout>
	);
};

export default Register;
