import React from "react";
import {GrClose} from "react-icons/gr";
import './actions.scss'

interface ActionProps {
	nameAction: string,
	isOpen: boolean,
	onClose: () => void,
	children?: string | React.ReactElement | React.ReactElement[] ,
}

const Action = ({nameAction, isOpen, onClose, children}: ActionProps) => {

	return <>
		{isOpen
			? <div className={"action-modal-window " + "action-name-" + nameAction}>
				<div className="action-modal-window__content">
					<div className={'close-btn'}>
						<button onClick={() => onClose()} ><GrClose/></button>
					</div>
					{children}
				</div>
			</div>
			: <></>
		}
	</>
}

export default Action;