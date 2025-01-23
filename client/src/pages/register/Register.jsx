import { useContext, useState } from 'react';
import Menu from '../../components/menu/Menu';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../context/auth.context';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	if (loading) return <h2>Loading..</h2>;
	if (user) return <Navigate to='/' replace />;
	return (
		<>
			<Menu />
			<h1>Register</h1>
			<form onSubmit={event => registerUser(navigate, event)}>
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
				<input type='submit' value={'Register user'} />
			</form>
		</>
	);
};

const registerUser = async (navigate, event) => {
	event.preventDefault();
	const email = event.target.email.value;
	const password = event.target.password.value;
	try {
		// Para firebaeResponse es igual al user, para acceder al id, está dentro del objeto user dentro de user, para sincronizar el id de firebase y el id de mongo hacemos esto
		const firebaseResponse = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const id = firebaseResponse.user.uid;

		// Para conectarlo a la BBDD la info de crear el usuario
		await fetch('http://localhost:3000/api/users', {
			// Especificamos el metodo
			method: 'POST',
			// Lo que le metemos, los nuevos datos
			body: JSON.stringify({ _id: id, email, password }),
			// Especificamos al servidor el tipo de información, dato le enviamos
			headers: { 'Content-Type': 'application/json' }
		});
		navigate('/');
	} catch (error) {
		console.log(error);
		console.error('Error registering users:', error.code, error.mesage);
	}
};

export default Register;
