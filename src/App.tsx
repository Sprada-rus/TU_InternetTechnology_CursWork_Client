import {useRoutes} from "./routes";
import useAppStore from "./appStore.ts";
import {useCallback} from "react";

function App() {
    const routes = useRoutes();
    const checkDisplayView = useAppStore(state => state.checkDisplayView);

    const resizeCallback = useCallback((e: Event<ResizeObserverCallback>) => checkDisplayView, [c]);

    return (
        <main>
            {routes}
        </main>
    )
}

export default App
