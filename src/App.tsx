import {useRoutes} from "./routes";

function App() {
  const routes = useRoutes();
  return (
      <main>
        {routes}
      </main>
  )
}

export default App
