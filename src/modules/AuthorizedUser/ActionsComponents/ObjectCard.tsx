import Action from "./Action.tsx";
import GeneratorForm, {FormFieldData} from "../../../Components/Tools/GeneratorForm";
import {useCallback, useEffect, useState} from "react";
import {stringIndex} from "../../../Interfaces";
import {useAuthorizedStore} from "../AccountPage/store.ts";
import Loading from "../../../Components/Loading";

// const testAttrFields = [
// 	{
// 		name: 'ln_rus',
// 		label: 'Фамилия',
// 		type: 'text',
// 		order: 10,
// 		required: true,
// 	},
// 	{
// 		name: 'fn_rus',
// 		label: 'Имя',
// 		type: 'text',
// 		order: 20,
// 		required: true,
// 	},
// 	{
// 		name: 'mn_rus',
// 		label: 'Отчество',
// 		type: 'text',
// 		order: 30,
// 		required: false,
// 	},
// 	{
// 		name: 'group',
// 		label: 'Номер группы',
// 		type: 'select',
// 		order: 40,
// 		required: false
// 	}
// ]
//
// const testDefaultValue = {
// 	ln_rus: 'Иванов',
// 	fn_rus: 'Иван',
// 	mn_rus: 'Иванович',
// }

interface ObjectCardProps {
	objId?: number,
	typeName: string,
	isOpen: boolean,
	onClose: () => void,
	afterSubmit?: () => void,
	action: string
}

const ObjectCard = ({onClose, afterSubmit, isOpen, typeName, objId, action}: ObjectCardProps) => {
	const [fieldsData, setFieldsData] = useState<FormFieldData[]>([]);
	const [defaultData, setDefaultData] = useState<stringIndex<any>>({});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const {service} = useAuthorizedStore();

	const getObjectData = useCallback(async () => {
		setLoading(true);
		try {
			if (objId !== undefined) {
				const objectData = await service?.get<stringIndex<any>>(`/api/user/object-data?code=${typeName}&objId=${objId}`)
				if (objectData) {
					setDefaultData(prevState => ({...prevState, ...objectData}));
				}
			} else {
				setDefaultData({});
			}

			const attrs = await service?.get<FormFieldData[]>(`/api/user/object-attrs?code=${typeName}`);

			if (attrs) {
				setFieldsData(() => [...attrs]);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}, [objId, service, typeName])

	useEffect(() => {
		if (service && isOpen) {
			void getObjectData().finally();
		}

		if (!objId) {
			setDefaultData({});
		}

	}, [service, getObjectData, isOpen, action]);

	const submitHandler = useCallback(async (value: stringIndex<any>) => {
		console.log('check');
		await service?.post(`/api/user/save?code=${typeName}${objId ? '&objId=' + objId : ''}`, value);

		onClose();
		afterSubmit && afterSubmit();
	}, [typeName, service, objId]);

	return <Action nameAction={'change'} onClose={onClose} isOpen={isOpen}>
		{loading
			? <Loading/>
			: <>
				{((!objId && Object.keys(defaultData).length === 0) || (objId && Object.keys(defaultData).length > 0)) &&
                    <GeneratorForm
                        formName={`${action}-${typeName}-obj_id-${objId ?? 'new'}`}
                        formFieldsData={fieldsData}
                        onSubmit={submitHandler}
                        defaultValues={defaultData}
                        submittingStateCallback={setIsSubmitting}
                        validStateCallback={setIsValid}
                    />
				}
				<div style={{position: "relative", marginTop: "1rem"}}>
					<button className="form-item__close-btn" onClick={() => onClose()}>Закрыть</button>
					<button className="form-item__submit-btn" style={{position: "absolute", right: "50%"}} form={`${action}-${typeName}-obj_id-${objId ?? 'new'}`} disabled={!isValid || isSubmitting}>Сохранить</button>
				</div>
			</>
		}
	</Action>
}

export default ObjectCard;