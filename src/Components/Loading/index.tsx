import {AiOutlineLoading3Quarters} from "react-icons/ai";
import "./Loading.scss";
import {IconContext} from "react-icons";

const Loading = () => {
	return <div className={'loading'}>
		<div className={'loading__component'}>
			<IconContext.Provider value={{size: '40'}}>
				<AiOutlineLoading3Quarters/>
			</IconContext.Provider>
		</div>
	</div>
}

export default Loading;