import {Card, CardContent} from "../../../Components/Card";
import NavBar from "../Components/NavBar";
import "./account.scss"
import {lazy, useCallback, useEffect, useMemo, useState} from "react";
import {INavItem} from "../Components/NavBar/NavItem";
import Grid, {GridDataProps, HeadItemProps} from "../Components/Grid";
import {ContextMenuItemProps} from "../Components/Grid/GridContextMenu";
import {useNavigate} from "react-router-dom";
import {getFingerprint} from "../../../Tools/Other";
import Service from "../../../Tools/Service";
import {useAuthorizedStore} from "./store.ts";
import Loading from "../../../Components/Loading";
import {stringIndex} from "../../../Interfaces";
const ObjectCard = lazy(() => import('../ActionsComponents/ObjectCard.tsx'));
const DeleteAction = lazy(() => import('../ActionsComponents/DeleteAction'));

// const testNavItems = [
//     {
//         name: 'Студенты',
//         to: 'students'
//     },
//     {
//         name: 'Преподаватели',
//         to: 'teachers'
//     },
//     {
//         name: 'Предменты',
//         to: 'subjects'
//     },
// ]

// const testGridData = {
//     headers: {
//         obj_id: {
//             name: 'ID объекта',
//             order: 0
//         },
//         full_name: {
//             name: 'ФИО',
//             order: 10
//         },
//         group: {
//             name: 'Группа',
//             order: 20
//         },
//         course: {
//             name: 'Курс',
//             order: 20
//         },
//     },
//     rows: [
//         {
//             obj_id: 1,
//             full_name: 'Иванов Иван Иванович',
//             group: '1448',
//             course: '8'
//         },
//         {
//             obj_id: 2,
//             full_name: 'Сергеев Сергей Сергеевич',
//             group: '1448',
//             course: '8'
//         },
//         {
//             obj_id: 3,
//             full_name: 'Антонов Антон Антонович',
//             group: '1449',
//             course: '9'
//         }
//     ]
// }

// const testContextMenu: ContextMenuItemProps[] = [
//     {
//         name: 'change',
//         label: 'Изменить',
//     },
//     {
//         name: 'delete',
//         label: 'Удалить'
//     }
// ]

const AccountPage = () => {
    const [activeChapter, setActiveChapter] = useState<INavItem|undefined>();
    const [isOpenModalAction, setIsOpenModalAction] = useState<boolean>(false);
    const [nameAction, setNameAction] = useState<string>('');
    const [selectedObjId, setSelectedObjId] = useState<number|undefined>();
    const [chapters, setChapters] = useState<INavItem[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [gridData, setGridData] = useState<GridDataProps>();
    const [actions, setActions] = useState<ContextMenuItemProps[]>([]);
    const navigation = useNavigate();
    const {token, service, setService} = useAuthorizedStore();
    const chooseHandler = useCallback((item: INavItem) => {
            setActiveChapter(item);
    }, [setActiveChapter]);
    const hasCreate = useMemo(() => {
        return Boolean(actions.find((item) => item.name === 'create'));
    }, [actions])

    useEffect(() => {
        void getChapters().finally();
    }, []);

    useEffect(() => {
        if (activeChapter) {
            void getData(activeChapter).finally();
        }
    }, [activeChapter]);

    useEffect(() => {
        for (const menuItem of actions) {
            menuItem.actionHandler = (id, typeAction) => {
                setNameAction(typeAction);
                setIsOpenModalAction(true);

                console.log('selectObjID', typeAction === 'create' ? undefined : id)
                setSelectedObjId(() => typeAction === 'create' ? undefined : id);
            }
        }
    }, [actions]);

    const getChapters = useCallback(async () => {
        setLoading(true)
        try {
            const fingerprint = await getFingerprint();
            const service = Service({
                hostName: import.meta.env.VITE_SERVICE_HOST as string,
                fingerprint: fingerprint,
                token: token
            });
            setService(service);

            const chapters = await service.get<INavItem[]>('/api/user/lists');

            setChapters(chapters);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const getData = useCallback(async (chapter: INavItem) => {
        setLoading(true);

        try {
            const attrs = await service?.get<stringIndex<HeadItemProps>>('/api/user/list-attrs?code=' + chapter.to);
            const data = await service?.get<stringIndex<any>[]>('/api/user/list-data?code=' + chapter.to);

            console.log(attrs, data, Boolean(attrs && data));

            if (attrs && data) {
                setGridData({headers: attrs, rows:data})
            }

            const actionsData = await service?.get<ContextMenuItemProps[]>(`/api/user/actions?code=${chapter.to}`);

            if (actionsData) {
                setActions(actionsData);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [service])

    const logoutHandler = useCallback(() => {
        navigation('/logout');
    }, []);

    return <Card>
        <CardContent>
            <div className={"exit-block"}>
                <button onClick={() => logoutHandler()}>Выйти</button>
            </div>
            <div className={"main-block"}>
                {chapters && <NavBar navItems={chapters} chooseHandler={chooseHandler}/>}
                <div className="main-block__content">
                    {!!activeChapter && <>
                        <h2>{activeChapter.name}</h2>
                    </>}
                    {loading && <>
                        <Loading/>
                    </>}
                    {!loading && chapters && gridData &&  <>
                        {hasCreate && <div>
                            <button className={"create-btn"} onClick={() => {
                                setNameAction('create');
                                setIsOpenModalAction(true);
                                setSelectedObjId(undefined);
                            }}>Новая запись</button>
                        </div>}
                        <Grid
                            name={'test'}
                            data={gridData}
                            doubleClickRowHandler={(id) => {
                                console.log('double clicked')
                                setSelectedObjId(id);
                                setNameAction('edit');
                                setIsOpenModalAction(true);
                            }
                            }
                            contextMenuItem={actions}
                        />
                    </>}
                </div>
            </div>
            {['edit', 'create'].includes(nameAction) && activeChapter && <ObjectCard
                objId={selectedObjId}
                typeName={activeChapter.to}
                action={nameAction}
                isOpen={isOpenModalAction}
                onClose={() => setIsOpenModalAction(false)}
                afterSubmit={() => {
                    void getData(activeChapter).finally()
                }}
            />}
            {nameAction === 'delete' && <DeleteAction/>}
        </CardContent>
    </Card>
}

export default AccountPage;