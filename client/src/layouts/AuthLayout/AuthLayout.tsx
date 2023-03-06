import { ReactNode } from 'react';
import { Link, useMatch } from 'react-router-dom';
import images from '../../assets/images';
import { HomeIcon } from '../../icons';

const AuthLayout = ({ children }: { children?: ReactNode }) => {
	const loginMode = Boolean(useMatch('/login'));

	return (
		<div
			className=' relative flex min-h-screen bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${images.authBg})` }}
		>
			<Link
				to={'/'}
				className='absolute top-20 left-20 cursor-pointer rounded-full bg-white p-2 text-blue-500'
			>
				<HomeIcon />
			</Link>
			<div className='m-auto  w-[450px]  rounded-lg px-5 py-4 shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px]'>
				<h2 className='text-center text-xl font-bold text-white'>
					{loginMode ? 'Login' : 'Sign Up'}
				</h2>
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
