import {Card, CardContent} from "../../../Components/Card";
import NavBar from "../Components/NavBar";
import "./account.scss"
import {useCallback, useState} from "react";
import {INavItem} from "../Components/NavBar/NavItem";
import Grid from "../Components/Grid";

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

const testGridData = {
    headers: {
        obj_id: {
            name: 'ID объекта',
            order: 0
        },
        full_name: {
            name: 'ФИО',
            order: 10
        },
        group: {
            name: 'Группа',
            order: 20
        },
        course: {
            name: 'Курс',
            order: 20
        },
    },
    rows: [
        {
            obj_id: 1,
            full_name: 'Иванов Иван Иванович',
            group: '1448',
            course: '8'
        },
        {
            obj_id: 2,
            full_name: 'Сергеев Сергей Сергеевич',
            group: '1448',
            course: '8'
        },
        {
            obj_id: 3,
            full_name: 'Антонов Антон Антонович',
            group: '1449',
            course: '9'
        }
    ]
}

const testContextMenu = [
    {
        name: 'change',
        label: 'Изменить',
    },
    {
        name: 'delete',
        label: 'Удалить'
    }
]

const AccountPage = () => {
    const [activeChapter, setActiveChapter] = useState<INavItem|undefined>()
    const chooseHandler = useCallback((item: INavItem) => {
            setActiveChapter(item);
    }, [setActiveChapter])

    return <Card>
        <CardContent>
            <div className={"main-block"}>
                <NavBar navItems={testNavItems} chooseHandler={chooseHandler}/>
                <div className="main-block__content">
                    {!!activeChapter && <>
                        <h2>{activeChapter.name}</h2>
                    </>}
                    <Grid
                        name={'test'}
                        data={testGridData}
                        doubleClickRowHandler={(id) => {
                                console.log('you click obj ', id)
                            }
                        }
                        contextMenuItem={testContextMenu}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
}

export default AccountPage;