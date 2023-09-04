import {Card, CardContent, CardTitle} from "../../../Components/Card";
import LoginForm from "./Components/LoginForm.tsx";

const MainPage = () => {
	return <Card classes={'small-card'}>
		<CardTitle>
			<h1>Авторизация</h1>
		</CardTitle>
		<CardContent>
			<LoginForm/>
		</CardContent>
	</Card>
}

export default MainPage;