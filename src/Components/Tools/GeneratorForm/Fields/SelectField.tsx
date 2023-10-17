import {ISelectFields} from "./FieldsType.ts";
import {Controller, useFormContext} from "react-hook-form";
import {useCallback, useEffect, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {useAuthorizedStore} from "../../../../modules/AuthorizedUser/AccountPage/store.ts";

interface SelectItemProps {
	value: number,
	label: string
}

const SelectField = ({name, hidden, disabled, label, required, source, description}: ISelectFields) => {
	const {formState: {errors}, control} = useFormContext();
	const [selectItems, setSelectItems] = useState<SelectItemProps[]>([]);
	const {service} = useAuthorizedStore();

	useEffect(() => {
		if (service) {
			void getOptions().finally();
		}
	}, [service]);


	const getOptions = useCallback(async () => {
		const options = await service?.get<SelectItemProps[]>(`/api/user/get-options?code=${source}`);

		if (options) {
			setSelectItems(options);
		}
	}, [source, service])

	return <>
		{!hidden && <div className="form-item form-item__select-field">
            <div className="form-item__label">
                <label htmlFor={"form-field_" + name}>{label}</label>
            </div>
            <div className="form-item__field">
                <Controller
					control={control}
					name={name}
					rules={{
						required: required ? `Поле «${label}» обязательно для заполнения.` : false
					}}
					render={({field: {onChange, value, name}}) => (
						<select
							id={"form-field_" + name}
							onChange={onChange}
							value={value as string}
							disabled={disabled}
						>
							<option value={''}></option>
							{selectItems.length > 0 &&
								selectItems.map((item) => {
										return <option value={item.value} key={`${name}_item_${item.value}`}>{item.label}</option>
									}
								)
							}
						</select>
					)}
				/>
                <ErrorMessage
                    name={name}
                    errors={errors}
                    render={(props) => <p className="text-danger">{props.message}</p>}
                />
            </div>
			<div className={'form-item__description'}>
				{description}
			</div>
        </div>}
	</>
}

export default SelectField;