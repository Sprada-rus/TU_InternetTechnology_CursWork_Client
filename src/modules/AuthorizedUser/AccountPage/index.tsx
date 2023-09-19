import {Card, CardContent} from "../../../Components/Card";
import NavBar from "../NavBar";
import "./account.scss"

const testNavItems = [
    {
        name: 'Студенты',
        to: '/'
    },
    {
        name: 'Преподаватели',
        to: '/'
    },
    {
        name: 'Предменты',
        to: '/'
    },
]

const AccountPage = () => {
    return <Card>
        <CardContent>
            <div className={"main-block"}>
                <NavBar  navItems={testNavItems}/>
                <div className="main-block__content">
                    asdasdasd
                </div>
            </div>
        </CardContent>
    </Card>
}

export default AccountPage;