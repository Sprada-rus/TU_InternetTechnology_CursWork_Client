import {Card, CardContent} from "../../../Components/Card";
import NavBar from "../Components/NavBar";
import "./account.scss"
import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {INavItem} from "../Components/NavBar/NavItem";
import Grid from "../Components/Grid";
import {ContextMenuItemProps} from "../Components/Grid/GridContextMenu";
import {BiLoaderAlt} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
const ObjectCard = lazy(() => import('../ActionsComponents/ObjectCard.tsx'));
const DeleteAction = lazy(() => import('../ActionsComponents/DeleteAction'));

const LoadModalWindow = () => {
    return <div style={{position: "fixed", width: '100%', height: '100vh', zIndex: '100', top: '0', left: '0'}}>
        <div ><BiLoaderAlt/></div>
    </div>
}

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

const testContextMenu: ContextMenuItemProps[] = [
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
    const [activeChapter, setActiveChapter] = useState<INavItem|undefined>();
    const [isOpenModalAction, setIsOpenModalAction] = useState<boolean>(false);
    const [nameAction, setNameAction] = useState<string>('');
    const [selectedObjId, setSelectedObjId] = useState<number>();
    const navigation = useNavigate();
    const chooseHandler = useCallback((item: INavItem) => {
            setActiveChapter(item);
    }, [setActiveChapter]);

    useEffect(() => {
        for (const menuItem of testContextMenu) {
            menuItem.actionHandler = (id, typeAction) => {
                setNameAction(typeAction);
                setIsOpenModalAction(true);
                setSelectedObjId(id);
            }
        }
    }, []);

    const logoutHandler = useCallback(() => {
        navigation('/logout');
    }, []);

    return <Card>
        <CardContent>
            <div className={"exit-block"}>
                <button onClick={() => logoutHandler()}>Выйти</button>
            </div>
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
                                setSelectedObjId(id);
                                setNameAction('change');
                                setIsOpenModalAction(true);
                            }
                        }
                        contextMenuItem={testContextMenu}
                    />
                </div>
            </div>
            <Suspense fallback={<LoadModalWindow/>}>
                {nameAction === 'change' && selectedObjId && <ObjectCard
                    objId={selectedObjId}
                    typeName={'change'}
                    isOpen={isOpenModalAction}
                    onClose={() => setIsOpenModalAction(false)}
                />}
                {nameAction === 'delete' && <DeleteAction/>}
            </Suspense>
        </CardContent>
    </Card>
}

export default AccountPage;