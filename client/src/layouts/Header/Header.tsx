import { handler } from '@tailwindcss/line-clamp';
import { Fragment, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../app.context';
import images from '../../assets/images';
import { clearAuth, saveAuth } from '../../utils/auth';
const Header = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { auth, setAuth } = useContext(AppContext);
	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleLogout = () => {
		clearAuth();
		setAuth(null);
	};

	return (
		<header className='flex items-center justify-between py-5 shadow'>
			<Link to={'/'}>
				<img src={images.logo} alt='Logo' className='h-12 ' />
			</Link>
			<nav>
				<div className='flex gap-10 font-semibold'>
					<NavLink
						to={'/'}
						className={({ isActive }) =>
							`text-lg transition-all hover:text-orange-500 hover:underline ${
								isActive ? 'text-orange-500 underline' : 'text-purple-600'
							}`
						}
					>
						HOME
					</NavLink>
					<NavLink
						to={'/blogs'}
						className={({ isActive }) =>
							`text-lg transition-all hover:text-orange-500 hover:underline ${
								isActive ? 'text-orange-500 underline' : 'text-purple-600'
							}`
						}
					>
						MANAGER NEWS
					</NavLink>
				</div>
			</nav>
			<div
				className='relative flex items-center gap-4'
				onMouseEnter={handleOpen}
				onMouseLeave={handleClose}
			>
				{auth ? (
					<Fragment>
						<div>
							<img src={images.avatarDf} alt='Avatar' className='h-10' />
						</div>
						<span>{auth.mail}</span>
					</Fragment>
				) : (
					<Fragment>
						<Link
							to={'/login'}
							className='cursor-pointer rounded-md border-4 p-1 font-semibold transition-all hover:border-orange-300 hover:text-orange-500'
						>
							Login
						</Link>
						<Link
							to='/register'
							className='cursor-pointer rounded-md border-4 p-1 font-semibold transition-all hover:border-orange-300 hover:text-orange-500'
						>
							Sign up
						</Link>
					</Fragment>
				)}
				{auth && isOpen && (
					<div className='absolute top-full left-[45%] z-10 rounded-md border bg-white py-2 px-4 shadow-md'>
						<button className='font-semibold' onClick={handleLogout}>
							Logout
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
