import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';

import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import ProtectedRoute from './protectedRoutes';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/profile' element={<Profile />} />
			</Route>
		</Routes>
	);
};

export default Router;
