import {ISelectFields} from "./FieldsType.ts";
import {useFormContext} from "react-hook-form";
import {useState} from "react";
import {ErrorMessage} from "@hookform/error-message";

interface SelectItemProps {
	value: number,
	label: string
}

const SelectField = ({name, hidden, disabled, label, required, source, description}: ISelectFields) => {
	const {register, formState: {errors}} = useFormContext();
	const [selectItems, setSelectItems] = useState<SelectItemProps[]>([]);

	const fieldProps = {...register(name, {
			required: required ? `Поле «${label}» обязательно для заполнения.` : false,
			disabled: disabled
		})};

	return <>
		{!hidden && <div className="form-item form-item__select-field">
            <div className="form-item__label">
                <label htmlFor={"form-field_" + name}>{label}</label>
            </div>
            <div className="form-item__field">
                <select id={"form-field_" + name} {...fieldProps}>
                    <option value={''}></option>
					{selectItems.length > 0 &&
						selectItems.map((item) => {
								return <option value={item.value} key={`${name}_item_${item.value}`}>{item.label}</option>
							}
						)
					}
                </select>
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