import {useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {useFormContext} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {ITextField} from "./FieldsType.ts";

const PasswordField = (props: ITextField) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const {register, formState: {errors}} = useFormContext();

    const fieldProps = {...register(props.name, {
            required: props.required ? `Поле «${props.label}» обязательно для заполнения.` : false,
            minLength: props.minLength ?? 8,
            maxLength: props.maxLength
        })};

    return <>
        <div className={'form-item form-item__password-field'}>
            <div className={"form-item__label"}>
                <label htmlFor={"form-field_" + props.name}>{props.label}</label>
            </div>
            <div className="form-item__field">
                <input id={"form-field_" + props.name} type={visiblePassword ? 'text' : props.type} {...fieldProps}/>
                <span className={"icon"} onClick={() => setVisiblePassword(prevState => !prevState)}>
                    {visiblePassword
                        ? <FaEye/>
                        : <FaEyeSlash/>
                    }
                </span>
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

export default PasswordField;