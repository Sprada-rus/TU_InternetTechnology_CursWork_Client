import {Card, CardContent} from "../Components/Card";
import {FaRotate} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Card classes={"small-card"}>
            <CardContent>
                <h3 className={"error__text"}>Произошла ошибка. Попробуйте обновить страницу позже.</h3>
                <div className={"error__reload"} onClick={() => {
                    navigate('/', {replace: true})
                }}>
                    <FaRotate/>
                </div>
            </CardContent>
        </Card>
    )
}

export default ErrorPage;