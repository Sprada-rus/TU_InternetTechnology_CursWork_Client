import {Routes, Route, Navigate} from "react-router-dom";
import {lazy} from "react";
import SuspendPage from "../Components/Tools/SuspendPage";
import Logout from "../modules/AuthorizedUser/Logout";
const ErrorPage = SuspendPage(lazy(() => import("../modules/ErrorPage.tsx")));
const MainPage = SuspendPage(lazy(() => import("../modules/Anonim/MainPage")));
const AccountPage = SuspendPage(lazy(() => import("../modules/AuthorizedUser/AccountPage")));

export const useRoutes = (token: string) => {

	if (token) {
		return <Routes>
			<Route path={'/'} errorElement={<ErrorPage/>}>
				<Route path={'/'} element={<Navigate to={'/main'}/>}/>
				<Route path={'/main'} element={<AccountPage/>}/>
				<Route path={'/error-page'} element={<ErrorPage/>}/>
				<Route path={'/logout'} element={<Logout/>}/>
			</Route>
		</Routes>
	}

	return(
		<Routes>
			<Route path={'/'} errorElement={<ErrorPage/>}>
				<Route path={'/'} element={<MainPage/>}/>
				<Route path={'/error-page'} element={<ErrorPage/>}/>
				<Route path={'*'} element={<Navigate to={'/'}/>} />
			</Route>
		</Routes>
	)
}

