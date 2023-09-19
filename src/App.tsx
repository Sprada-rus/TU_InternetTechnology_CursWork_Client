import {useRoutes} from "./routes";
import useAppStore from "./appStore.ts";
import {useEffect} from "react";

function App() {
    const routes = useRoutes();
    const checkDisplayView = useAppStore(state => state.checkDisplayView);

    useEffect(() => {
        window.addEventListener('resize', checkDisplayView);

        return () => {
            window.removeEventListener('resize', checkDisplayView)
        }
    }, []);

    return (
        <main>
            {routes}
        </main>
    )
}

export default App
