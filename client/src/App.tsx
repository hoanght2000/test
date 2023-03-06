import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import Blogs from './pages/Blogs';
import Form from './pages/Form';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<div>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path={'/'} element={<Home />} />
					<Route path={'/blogs'} element={<Blogs />} />
					<Route path='/form' element={<Form />} />
				</Route>
				<Route path={'/login'} element={<Login />} />
				<Route path={'/register'} element={<Register />} />
			</Routes>
			<ToastContainer autoClose={1500} />
		</div>
	);
}

export default App;
