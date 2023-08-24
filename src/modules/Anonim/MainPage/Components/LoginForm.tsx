import GeneratorForm, {FormFieldData} from "../../../../Components/Tools/GeneratorForm";
import {Suspense, useCallback, useState} from "react";
import {stringIndex} from "../../../../Interfaces";

const LoginFields: FormFieldData[] = [
    {
        name: 'login',
        required: true,
        label: 'Логин',
        type: 'text',
        order: 10
    },
    {
        name: 'password',
        required: true,
        label: 'Пароль',
        type: 'password',
        order: 20
    }
];

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const submitHandler = useCallback(async (value: stringIndex<any>) => {
        const resolveValue =  await new Promise((resolve) => {
            resolve(value);
        })

        console.log(resolveValue);
    }, []);

    return (
        <Suspense>
            <GeneratorForm
                formFieldsData={LoginFields}
                onSubmit={submitHandler}
                formName={"login-form"}
                submittingStateCallback={setIsSubmitting}
                validStateCallback={setIsValid}
            />
            <button
                type={"submit"}
                form={"login-form"}
                className="btn-primary full-width"
                disabled={!isValid || isSubmitting}
            >
                Войти
            </button>
        </Suspense>
    )
}

export default LoginForm;