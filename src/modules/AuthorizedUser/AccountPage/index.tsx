import {Card, CardContent} from "../../../Components/Card";
import NavBar from "../Components/NavBar";
import "./account.scss"
import {useCallback, useState} from "react";

const testNavItems = [
    {
        name: 'Студенты',
        to: 'students'
    },
    {
        name: 'Преподаватели',
        to: 'teachers'
    },
    {
        name: 'Предменты',
        to: 'subjects'
    },
]

const AccountPage = () => {
    const [activeChapter, setActiveChapter] = useState<string>('')
    const chooseHandler = useCallback((chapter: string) => {
            setActiveChapter(chapter);
    }, [setActiveChapter])

    return <Card>
        <CardContent>
            <div className={"main-block"}>
                <NavBar navItems={testNavItems} chooseHandler={chooseHandler}/>
                <div className="main-block__content">
                    {activeChapter}
                </div>
            </div>
        </CardContent>
    </Card>
}

export default AccountPage;