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
import {HiOutlineMenu} from "react-icons/hi";
const ObjectCard = lazy(() => import('../ActionsComponents/ObjectCard.tsx'));
const DeleteAction = lazy(() => import('../ActionsComponents/DeleteAction'));

const AccountPage = () => {
    const [activeChapter, setActiveChapter] = useState<INavItem|undefined>();
    const [isOpenModalAction, setIsOpenModalAction] = useState<boolean>(false);
    const [nameAction, setNameAction] = useState<string>('');
    const [selectedObjId, setSelectedObjId] = useState<number|undefined>();
    const [chapters, setChapters] = useState<INavItem[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [gridData, setGridData] = useState<GridDataProps>();
    const [hasError, setHasError] = useState<boolean>(false);
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
        setHasError(false);

        try {
            const attrs = await service?.get<stringIndex<HeadItemProps>>('/api/user/list-attrs?code=' + chapter.to);
            const data = await service?.get<stringIndex<any>[]>('/api/user/list-data?code=' + chapter.to);

            if (attrs && data) {
                setGridData({headers: attrs, rows:data})
            }

            const actionsData = await service?.get<ContextMenuItemProps[]>(`/api/user/actions?code=${chapter.to}`);

            if (actionsData) {
                setActions(actionsData);
            }
        } catch (e) {
            console.error(e);
            setHasError(true);
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
                    {!activeChapter && <>
                        <h3>Добро пожаловать в модуль управления данных Технологического института!</h3>
                        <p>В данном модуле вы можете добавлять, удалять и изменять данные.</p>
                        <p>Вы можете выбрать слудующие типы данных:</p>
                        <ul>
                            <li>Данные группы</li>
                            <li>Данные курса</li>
                            <li>Данные специальности</li>
                            <li>Данные учителей</li>
                            <li>Данные студентов</li>
                        </ul>
                        <p>Для выбора типа обхектов, необходимо нажать на кнопку меню <HiOutlineMenu/> и выбрать из выпадающего списка.</p>
                        <p><b><i>Если в выпадающем списке нет интересующего вас типа, то просьба обратиться к администратору сайт для предоставления прав.</i></b></p>
                        <p>Для выхода из модуля, необходимо нажать на кнопку &#34;Выйти&#34; в правом верхнем углу.</p>
                    </>}
                    {!!activeChapter && <>
                        <h2>{activeChapter.name}</h2>
                        <p>
                            Для открытия карточки объекта, можно нажать двойным кликом левой кнопки мыши, по интересующей строке объекта.<br/>
                            Также можно открыть карточку из контекстного меню, выбрав пункт &#34;Изменить&#34;.
                        </p>
                        <p>Открыть контекстное меню можно нажатием правой кнопки мыши по строке объекта.</p>
                        <p>
                            Для создания нового объекта необходимо нажать на кнопку &#34;Новая запись&#34; или выбрать, в контекстном меню, одноименный пункт.
                        </p>
                        <p>
                            Для удаления объекта, необходимо выбрать пункт &#34;Удалить&#34;, в контекстном меню.
                        </p>
                        <p>
                            <b><i>Если у вас нет одного из представленных функционала, то обратитесь к администратору.</i></b>
                        </p>
                    </>}
                    {loading && <>
                        <Loading/>
                    </>}
                    {!loading && hasError && <div className="info info-error">
                        Произошла ошибка, обратитесь к администратору.
                    </div>}
                    {!loading && !hasError && chapters && gridData &&  <>
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
                    void getData(activeChapter).finally();
                }}
            />}
            {nameAction === 'delete' && activeChapter && selectedObjId && <DeleteAction
                objId={selectedObjId}
                typeName={activeChapter.to}
                isOpen={isOpenModalAction}
                onClose={() => setIsOpenModalAction(false)}
                afterSubmit={() => {
                    void getData(activeChapter).finally();
                }}
            />}
        </CardContent>
    </Card>
}

export default AccountPage;