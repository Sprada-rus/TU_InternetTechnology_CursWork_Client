import {ComponentType, Suspense} from "react";
import Loading from "../../Loading";

const SuspendPage = (Component: ComponentType<any>) => {
	const LoadedComponent = (props: any): JSX.Element => (
		<Suspense fallback={<Loading />}>
			<Component {...props} />
		</Suspense>
	)

	return LoadedComponent
};

export default SuspendPage;