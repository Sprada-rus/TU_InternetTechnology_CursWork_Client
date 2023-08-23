import {Routes, Route} from "react-router-dom";
import MainPage from "../modules/Anonim/MainPage";

export const useRoutes = () => {
	return(
		<Routes>
			<Route path={'/'} element={<MainPage/>}/>
		</Routes>
	)
}

