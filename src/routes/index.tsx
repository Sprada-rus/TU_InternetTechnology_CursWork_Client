import {Routes, Route} from "react-router-dom";
import {lazy} from "react";
const ErrorPage = lazy(() => import("../modules/ErrorPage.tsx"));
const MainPage = lazy(() => import("../modules/Anonim/MainPage"));
const AccountPage = lazy(() => import("../modules/AuthorizedUser/AccountPage"));

export const useRoutes = () => {

	return(
		<Routes>
			<Route path={'/'} errorElement={<ErrorPage/>}>
				<Route path={'/'} element={<MainPage/>}/>
				<Route path={'/main'}>
					<Route path={'/main'} element={<AccountPage/>}/>
				</Route>
				<Route path={'/error-page'} element={<ErrorPage/>}/>
			</Route>
		</Routes>
	)
}
 
