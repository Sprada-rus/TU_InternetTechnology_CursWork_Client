import {useRoutes} from "./routes";
import useAppStore from "./appStore.ts";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {useAuthorizedStore} from "./modules/AuthorizedUser/AccountPage/store.ts";

function App() {
    const checkDisplayView = useAppStore(state => state.checkDisplayView);
    const {token} = useAuthorizedStore();
    const routes = useRoutes(token);

    useEffect(() => {
        window.addEventListener('resize', checkDisplayView);

        return () => {
            window.removeEventListener('resize', checkDisplayView)
        }
    }, []);

    return (
        <main>
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </main>
    )
}

export default App
