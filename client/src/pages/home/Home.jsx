import { useContext } from 'react';
import Menu from '../../components/menu/Menu';
import { AuthContext } from '../../context/auth.context';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const Home = () => {
	const { user } = useContext(AuthContext);
	return (
		<>
			<Menu />
			<h1>HOME</h1>
			{user && <button onClick={logOut}>Sign Out</button>}
		</>
	);
};

const logOut = async () => {
	await signOut(auth);
};

export default Home;
