import {Routes, Route} from "react-router-dom";
import {lazy} from "react";
const MainPage = lazy(() => import("../modules/Anonim/MainPage"));
const AccountPage = lazy(() => import("../modules/AuthorizedUser/AccountPage"));

export const useRoutes = () => {

	return(
		<Routes>
			<Route path={'/'} element={<MainPage/>}/>
			<Route path={'/main'} element={<AccountPage/>}/>
		</Routes>
	)
}
 
