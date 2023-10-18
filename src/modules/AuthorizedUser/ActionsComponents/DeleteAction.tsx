import {useCallback, useState} from "react";
import {useAuthorizedStore} from "../AccountPage/store.ts";
import Action from "./Action.tsx";
import Loading from "../../../Components/Loading";

interface DeleteActionProps {
	objId: number,
	typeName: string,
	isOpen: boolean,
	onClose: () => void,
	afterSubmit?: () => void
}

const DeleteAction = ({onClose, afterSubmit, isOpen, typeName, objId}: DeleteActionProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const {service} = useAuthorizedStore();

	const deleteHandler = useCallback(async () => {
		setLoading(true);

		try {
			await service?.delete(`/api/user/delete?code=${typeName}&id=${objId}`);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}

		onClose();
		afterSubmit && afterSubmit();
	}, [objId, typeName, afterSubmit])

	return <Action nameAction={'delete'} onClose={onClose} isOpen={isOpen}>
		{loading
			? <Loading/>
			: <div>
				<p>Вы уверены, что хотите удалить этот объект?</p>
				<div style={{position: "relative", marginTop: "1rem"}}>
					<button className="form-item__close-btn" onClick={() => onClose()}>Отмена</button>
					<button className="form-item__submit-btn" style={{position: "absolute", right: "50%"}} onClick={() => {
						void deleteHandler().catch();
					}}>Да</button>
				</div>
			</div>
		}
	</Action>
}

export default DeleteAction;