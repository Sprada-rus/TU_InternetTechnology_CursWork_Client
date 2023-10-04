import Action from "./Action.tsx";
import GeneratorForm, {FormFieldData} from "../../../Components/Tools/GeneratorForm";
import {useCallback, useEffect, useState} from "react";
import {stringIndex} from "../../../Interfaces";

const testAttrFields = [
	{
		name: 'ln_rus',
		label: 'Фамилия',
		type: 'text',
		order: 10,
		required: true,
	},
	{
		name: 'fn_rus',
		label: 'Имя',
		type: 'text',
		order: 20,
		required: true,
	},
	{
		name: 'mn_rus',
		label: 'Отчество',
		type: 'text',
		order: 30,
		required: false,
	},
	{
		name: 'group',
		label: 'Номер группы',
		type: 'select',
		order: 40,
		required: false
	}
]

const testDefaultValue = {
	ln_rus: 'Иванов',
	fn_rus: 'Иван',
	mn_rus: 'Иванович',
}

interface ChangeActionProps {
	objId: number,
	typeName: string,
	isOpen: boolean,
	onClose: () => void,
	afterSubmit?: () => void
}

const ObjectCard = ({onClose, afterSubmit, isOpen, typeName, objId}: ChangeActionProps) => {
	const [fieldsData, setFieldsData] = useState<FormFieldData[]>([]);
	const [defaultData, setDefaultData] = useState<stringIndex<any>>({});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(false);

	useEffect(() => {
		setFieldsData(testAttrFields)
		setDefaultData(testDefaultValue);
	}, [])

	const submitHandler = useCallback(async (value: stringIndex<any>) => {
		onClose();
		afterSubmit && afterSubmit();
	}, []);

	return <Action nameAction={'change'} onClose={onClose} isOpen={isOpen}>
		<GeneratorForm
			formName={`change-type-${typeName}-obj_id-${objId}`}
			formFieldsData={fieldsData}
			onSubmit={submitHandler}
			defaultValues={defaultData}
			submittingStateCallback={setIsSubmitting}
			validStateCallback={setIsValid}
		/>
		<div>
			<button className="form-item__close-btn" onClick={() => onClose()}>Закрыть</button>
			<button className="form-item__submit-btn" form={`change-type-${typeName}-obj_id-${objId}`} disabled={!isValid || isSubmitting}>Сохранить</button>
		</div>
	</Action>
}

export default ObjectCard;