import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useAuthorizedStore} from "../AccountPage/store.ts";

const Logout = () => {
	const {setToken} = useAuthorizedStore();

	useEffect(() => {
		setToken('');
	}, []);

	return <Navigate to={'/'}/>
}

export default Logout;