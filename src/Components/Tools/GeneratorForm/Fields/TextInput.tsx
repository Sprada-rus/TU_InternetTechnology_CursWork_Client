import {useFormContext} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {ITextField} from "./FieldsType.ts";

const TextInput = (props: ITextField) => {
    const {register, formState: {errors}} = useFormContext();

    const fieldProps = {...register(props.name, {
            required: props.required ? `Поле «${props.label}» обязательно для заполнения.` : false,
            minLength: props.minLength ?? 3,
            maxLength: props.maxLength
        })};

    return <>
        <div className={'form-item form-item__text-field'}>
            <div className={"form-item__label"}>
                <label htmlFor={"form-field_" + props.name}>{props.label}</label>
            </div>
            <div className="form-item__field">
                <input id={"form-field_" + props.name} type={props.type} {...fieldProps}/>
                {props.description &&
                    <p>{props.description}</p>
                }
                <ErrorMessage
                    name={props.name}
                    errors={errors}
                    render={(props) => <p className="text-danger">{props.message}</p>}
                />
            </div>

        </div>
    </>
}

export default TextInput;