import { useContext, useState } from 'react';
import Menu from '../../components/menu/Menu';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../context/auth.context';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	if (loading) return <h2>Loading..</h2>;
	if (user) return <Navigate to='/' replace />;
	return (
		<>
			<Menu />
			<h1>Login</h1>
			<form onSubmit={event => loginUser(event, navigate)}>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' name='email' id='email' />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					{/* en una situacion real el tipo seria password */}
					<input
						type={showPass ? 'text' : 'password'}
						name='password'
						id='password'
					/>
					<button
						type='button'
						onMouseDown={() => setShowPass(true)}
						onMouseUp={() => setShowPass(false)}
					>
						SHOW PASSWORD
					</button>
				</div>
				<input type='submit' value={'Log in user'} />
			</form>
		</>
	);
};

const loginUser = async (event, navigate) => {
	event.preventDefault();
	const email = event.target.email.value;
	const password = event.target.password.value;
	try {
		await signInWithEmailAndPassword(auth, email, password);
		// Para limpiar el formulario event.target.reset();
		navigate('/');
	} catch (error) {
		console.log(error);
		console.error('Error registering users:', error.code, error.mesage);
	}
};

export default Login;
