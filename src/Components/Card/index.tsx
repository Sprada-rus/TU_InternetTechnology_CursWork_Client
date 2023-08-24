import {IChildrenProp} from "../../Interfaces";
import "./card.scss"

export const Card = ({children, classes}: IChildrenProp) => {
	return <div className={"card" + (classes ? ' ' + classes : '') }>
		{children}
	</div>
}

export const CardTitle = ({children}: IChildrenProp) => {
	return <div className="card__title">
		{children}
	</div>
}

export const CardContent = ({children}: IChildrenProp) => {
	return <div className={"card__content"}>
		{children}
	</div>
}

export const CardFooter = ({children}: IChildrenProp) => {
	return <div className={"card__footer"}>
		{children}
	</div>
}